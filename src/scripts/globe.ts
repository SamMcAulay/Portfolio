// The clay Earth: a matte, hand-made-looking globe you can spin, with a pin on Athlone.
import * as THREE from 'three';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import land110 from 'world-atlas/land-110m.json';

const COLORS = {
  ocean: '#7db3d8',
  oceanDeep: '#6aa3cc',
  land: '#a8cf9c',
  landDeep: '#93bf87',
  sand: '#f3ddb8',
  ice: '#f1f5fa',
  coral: '#ee8472',
};

const ATHLONE = { lat: 53.42, lon: -7.94 };
const CAMERA_Z = 4.75;

export interface GlobeHandle {
  /** Ease the camera in towards the globe, for a page change. Resolves when done. */
  dive(): Promise<void>;
}

/** Direction on the unit sphere for a lat/lon, matching three's SphereGeometry UV layout. */
function toVector(lat: number, lon: number) {
  const phi = ((lon + 180) / 360) * Math.PI * 2;
  const theta = ((90 - lat) / 180) * Math.PI;
  return new THREE.Vector3(-Math.cos(phi) * Math.sin(theta), Math.cos(theta), Math.sin(phi) * Math.sin(theta));
}

/** Seeded random, so the clay mottling is the same on every visit (and matches the poster). */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paintTextures() {
  const W = 2048;
  const H = 1024;
  const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land);
  const projection = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
  const rand = rng(11);

  const make = () => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    return [c, c.getContext('2d')!] as const;
  };

  // Colour: ocean, a sandy shoreline, land, gentle mottling, soft ice at the poles.
  const [color, cx] = make();
  const path = geoPath(projection, cx);
  cx.fillStyle = COLORS.ocean;
  cx.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) {
    cx.fillStyle = rand() > 0.5 ? COLORS.oceanDeep : '#8cbedf';
    cx.globalAlpha = 0.18;
    cx.beginPath();
    cx.arc(rand() * W, rand() * H, 20 + rand() * 70, 0, Math.PI * 2);
    cx.fill();
  }
  cx.globalAlpha = 1;
  cx.beginPath();
  path(land);
  cx.lineJoin = 'round';
  cx.strokeStyle = COLORS.sand;
  cx.lineWidth = 7;
  cx.stroke();
  cx.fillStyle = COLORS.land;
  cx.fill();
  cx.save();
  cx.clip();
  for (let i = 0; i < 420; i++) {
    cx.fillStyle = rand() > 0.6 ? COLORS.landDeep : '#b6d8ab';
    cx.globalAlpha = 0.35;
    cx.beginPath();
    cx.arc(rand() * W, rand() * H, 8 + rand() * 40, 0, Math.PI * 2);
    cx.fill();
  }
  cx.restore();
  cx.globalAlpha = 1;
  const ice = cx.createLinearGradient(0, 0, 0, H);
  ice.addColorStop(0, COLORS.ice);
  ice.addColorStop(0.07, 'rgba(241,245,250,0)');
  ice.addColorStop(0.9, 'rgba(241,245,250,0)');
  ice.addColorStop(1, COLORS.ice);
  cx.fillStyle = ice;
  cx.fillRect(0, 0, W, H);

  // Height: land blurred into soft, puffy clay slabs.
  const [height, hx] = make();
  hx.fillStyle = '#000';
  hx.fillRect(0, 0, W, H);
  hx.filter = 'blur(10px)';
  hx.fillStyle = '#fff';
  hx.beginPath();
  geoPath(projection, hx)(land);
  hx.fill();
  hx.filter = 'none';

  // Surface: fine, irregular dents, like clay pressed by thumbs.
  const [bump, bx] = make();
  bx.fillStyle = '#808080';
  bx.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) {
    const v = Math.floor(100 + rand() * 60);
    bx.fillStyle = `rgb(${v},${v},${v})`;
    bx.globalAlpha = 0.5;
    bx.beginPath();
    bx.arc(rand() * W, rand() * H, 3 + rand() * 14, 0, Math.PI * 2);
    bx.fill();
  }
  bx.globalAlpha = 1;
  bx.filter = 'blur(3px)';
  bx.drawImage(bump, 0, 0);
  bx.filter = 'none';

  return { color, height, bump };
}

function makePin() {
  const pin = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: COLORS.coral, roughness: 0.8 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.045, 24, 16), mat);
  head.position.y = 0.12;
  const stem = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.1, 16), mat);
  stem.rotation.x = Math.PI;
  stem.position.y = 0.06;
  pin.add(head, stem);
  return pin;
}

export function mountGlobe(host: HTMLElement): GlobeHandle | null {
  const canvas = host.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null; // No WebGL: the poster image stays.
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
  camera.position.z = CAMERA_Z;

  // Soft studio light: sky from above, warm sand bounce from below, a warm key and a cool rim.
  scene.add(new THREE.HemisphereLight('#f4f8ff', '#e9d3ad', 1.6));
  const key = new THREE.DirectionalLight('#fff4e6', 2.1);
  key.position.set(-2.5, 2.2, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#cfe2ff', 1.2);
  rim.position.set(2.5, -0.5, -2);
  scene.add(rim);

  const { color, height, bump } = paintTextures();
  const colorMap = new THREE.CanvasTexture(color);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = 4;
  const heightMap = new THREE.CanvasTexture(height);
  const bumpMap = new THREE.CanvasTexture(bump);

  const globe = new THREE.Group();
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 256, 128),
    new THREE.MeshStandardMaterial({
      map: colorMap,
      displacementMap: heightMap,
      displacementScale: 0.045,
      displacementBias: -0.005,
      bumpMap,
      bumpScale: 1.4,
      roughness: 0.92,
      metalness: 0,
    }),
  );
  globe.add(earth);

  const pin = makePin();
  const at = toVector(ATHLONE.lat, ATHLONE.lon);
  pin.position.copy(at.clone().multiplyScalar(1.035));
  pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), at);
  globe.add(pin);
  scene.add(globe);


  // Start with Ireland facing the viewer, a little above centre.
  const yawFor = Math.atan2(-at.x, at.z);
  const state = {
    yaw: yawFor,
    pitch: 0.55,
    vYaw: 0,
    vPitch: 0,
    lastInput: 0,
  };

  const still = matchMedia('(prefers-reduced-motion: reduce)');

  const resize = () => {
    const { width, height: h } = host.getBoundingClientRect();
    renderer.setSize(width, h, false);
    camera.aspect = width / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(() => {
    resize();
    draw();
  }).observe(host);
  resize();

  const draw = () => {
    globe.rotation.set(state.pitch, state.yaw, 0, 'XYZ');
    renderer.render(scene, camera);
  };

  // ---- Loop: only while visible, and never when motion is reduced and nothing is moving.
  let raf = 0;
  let last = performance.now();
  let onScreen = true;

  const tick = (t: number) => {
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    const idle = t - state.lastInput > 2200;

    if (!dragging) {
      state.yaw += state.vYaw * dt;
      state.pitch += state.vPitch * dt;
      const decay = Math.exp(-3 * dt);
      state.vYaw *= decay;
      state.vPitch *= decay;
      if (idle && !still.matches) state.vYaw += (0.12 - state.vYaw) * (1 - Math.exp(-0.8 * dt));
      // Ease the tilt back towards a comfortable angle.
      state.pitch += (0.4 - state.pitch) * (1 - Math.exp(-0.6 * dt)) * (idle ? 1 : 0);
    }
    state.pitch = Math.max(-0.9, Math.min(1.1, state.pitch));
    draw();

    const moving = dragging || Math.abs(state.vYaw) > 0.002 || Math.abs(state.vPitch) > 0.002;
    if (onScreen && document.visibilityState === 'visible' && (!still.matches || moving)) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  const wake = () => {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    if (onScreen) wake();
  }).observe(host);
  document.addEventListener('visibilitychange', wake);

  // ---- Drag to spin, with inertia.
  let dragging = false;
  let px = 0;
  let py = 0;
  let pt = 0;

  host.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    px = e.clientX;
    py = e.clientY;
    pt = e.timeStamp;
    state.vYaw = state.vPitch = 0;
    state.lastInput = performance.now();
    host.setPointerCapture(e.pointerId);
    host.classList.add('is-dragging');
    wake();
  });

  host.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    const dt = Math.max(8, e.timeStamp - pt) / 1000;
    const k = 2.4 / host.clientWidth;
    state.yaw += dx * k;
    state.pitch += dy * k;
    state.vYaw = (dx * k) / dt;
    state.vPitch = (dy * k) / dt;
    px = e.clientX;
    py = e.clientY;
    pt = e.timeStamp;
    state.lastInput = performance.now();
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    host.classList.remove('is-dragging');
    state.vYaw = Math.max(-6, Math.min(6, state.vYaw));
    state.vPitch = Math.max(-3, Math.min(3, state.vPitch));
    state.lastInput = performance.now();
    wake();
  };
  host.addEventListener('pointerup', release);
  host.addEventListener('pointercancel', release);

  // Keyboard: arrow keys turn the globe when it has focus.
  host.addEventListener('keydown', (e) => {
    const step = { ArrowLeft: [-0.3, 0], ArrowRight: [0.3, 0], ArrowUp: [0, -0.2], ArrowDown: [0, 0.2] }[e.key];
    if (!step) return;
    e.preventDefault();
    state.yaw += step[0];
    state.pitch += step[1];
    state.lastInput = performance.now();
    draw();
    wake();
  });

  draw();
  host.classList.add('is-live');
  wake();

  return {
    dive() {
      if (still.matches) return Promise.resolve();
      return new Promise((resolve) => {
        const start = performance.now();
        const from = camera.position.z;
        const spin = state.yaw;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / 420);
          const e = 1 - Math.pow(1 - p, 3);
          camera.position.z = from - (from - 3.3) * e;
          state.yaw = spin + 0.35 * e;
          draw();
          if (p < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });
    },
  };
}
