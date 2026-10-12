// The clay Earth: a matte, hand-made-looking globe you spin to find your way round the site.
// Signposts are planted on its surface; their signs are real links that turn with the globe.
import * as THREE from 'three';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import land110 from 'world-atlas/land-110m.json';

const COLORS = {
  ocean: '#a6f0e2',
  oceanDeep: '#92e6d6',
  oceanLight: '#bdf6eb',
  land: '#fff1a8',
  landDeep: '#ffe58a',
  landLight: '#fff7c8',
  shore: '#fff8f2',
  ice: '#fff8f2',
  coral: '#ff7a59',
  post: '#fff8f2',
};

const ATHLONE = { lat: 53.42, lon: -7.94 };
const CAMERA_Z = 4.75;
const POST_HEIGHT = 0.34;

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

  // Colour: mint sea, a cream shoreline, butter land, gentle mottling, soft caps at the poles.
  const [color, cx] = make();
  const path = geoPath(projection, cx);
  cx.fillStyle = COLORS.ocean;
  cx.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) {
    cx.fillStyle = rand() > 0.5 ? COLORS.oceanDeep : COLORS.oceanLight;
    cx.globalAlpha = 0.2;
    cx.beginPath();
    cx.arc(rand() * W, rand() * H, 20 + rand() * 70, 0, Math.PI * 2);
    cx.fill();
  }
  cx.globalAlpha = 1;
  cx.beginPath();
  path(land);
  cx.lineJoin = 'round';
  cx.strokeStyle = COLORS.shore;
  cx.lineWidth = 7;
  cx.stroke();
  cx.fillStyle = COLORS.land;
  cx.fill();
  cx.save();
  cx.clip();
  for (let i = 0; i < 420; i++) {
    cx.fillStyle = rand() > 0.6 ? COLORS.landDeep : COLORS.landLight;
    cx.globalAlpha = 0.35;
    cx.beginPath();
    cx.arc(rand() * W, rand() * H, 8 + rand() * 40, 0, Math.PI * 2);
    cx.fill();
  }
  cx.restore();
  cx.globalAlpha = 1;
  const ice = cx.createLinearGradient(0, 0, 0, H);
  ice.addColorStop(0, COLORS.ice);
  ice.addColorStop(0.07, 'rgba(255,248,242,0)');
  ice.addColorStop(0.9, 'rgba(255,248,242,0)');
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

/** A clay signpost in the destination's colour: a mound, a thick rolled post and a knob at the top. The sign is the page's link. */
function makePost(tone: string) {
  const post = new THREE.Group();
  const clay = new THREE.MeshStandardMaterial({ color: tone, roughness: 0.88 });
  const mound = new THREE.Mesh(new THREE.SphereGeometry(0.05, 20, 12), clay);
  mound.scale.set(1, 0.42, 1);
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.026, POST_HEIGHT, 16), clay);
  stick.position.y = POST_HEIGHT / 2;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.026, 16, 12), clay);
  knob.position.y = POST_HEIGHT;
  post.add(mound, stick, knob);
  return post;
}

interface Sign {
  el: HTMLAnchorElement;
  item: HTMLElement;
  dir: THREE.Vector3;
  post: THREE.Object3D;
  anchor: THREE.Vector3;
}

export function mountGlobe(host: HTMLElement): GlobeHandle | null {
  const canvas = host.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null; // No WebGL: the poster image and the plain link row stay.
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // No filmic curve: it would wash the pastel clay out towards sage and sand.
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
  camera.position.z = CAMERA_Z;

  // Soft studio light: bright from above, a pink bounce from the ground, a warm key and a cool rim.
  scene.add(new THREE.HemisphereLight('#ffffff', '#ffe0ea', 1.95));
  const key = new THREE.DirectionalLight('#fff8f0', 1.35);
  key.position.set(-2.5, 2.2, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#e2f6ff', 0.55);
  rim.position.set(2.5, -0.5, -2);
  scene.add(rim);

  const { color, height, bump } = paintTextures();
  const colorMap = new THREE.CanvasTexture(color);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = 4;

  const globe = new THREE.Group();
  globe.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(1, 256, 128),
      new THREE.MeshStandardMaterial({
        map: colorMap,
        displacementMap: new THREE.CanvasTexture(height),
        displacementScale: 0.045,
        displacementBias: -0.005,
        bumpMap: new THREE.CanvasTexture(bump),
        bumpScale: 1.4,
        roughness: 0.92,
        metalness: 0,
      }),
    ),
  );

  const up = new THREE.Vector3(0, 1, 0);
  const plant = (obj: THREE.Object3D, dir: THREE.Vector3, lift = 1.03) => {
    obj.position.copy(dir.clone().multiplyScalar(lift));
    obj.quaternion.setFromUnitVectors(up, dir);
    globe.add(obj);
  };

  const athlone = toVector(ATHLONE.lat, ATHLONE.lon);
  plant(makePin(), athlone, 1.035);

  // Signposts, read from the link list in the page.
  const signs: Sign[] = [...host.querySelectorAll<HTMLAnchorElement>('[data-sign]')].map((el) => {
    const dir = toVector(Number(el.dataset.lat), Number(el.dataset.lon));
    const tone = getComputedStyle(el).backgroundColor;
    const post = makePost(tone);
    plant(post, dir);
    return { el, item: el.closest('li')!, dir, post, anchor: new THREE.Vector3() };
  });
  scene.add(globe);

  // ---- Orientation
  const faceFor = (dir: THREE.Vector3, above = 0.12) => {
    const yaw = Math.atan2(-dir.x, dir.z);
    const zr = Math.hypot(dir.x, dir.z);
    const pitch = Math.atan2(dir.y, zr) - Math.asin(above);
    return { yaw, pitch };
  };

  const start = faceFor(athlone, 0.35);
  const state = {
    yaw: start.yaw - 0.35,
    pitch: start.pitch,
    vYaw: 0,
    vPitch: 0,
    lastInput: 0,
    target: null as null | { yaw: number; pitch: number },
  };

  const still = matchMedia('(prefers-reduced-motion: reduce)');

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };

  // ---- Place each sign over its post; fade signs that have turned away.
  const world = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const placeSigns = () => {
    const hostRect = host.getBoundingClientRect();
    const rect = canvas.getBoundingClientRect();
    const ox = rect.left - hostRect.left;
    const oy = rect.top - hostRect.top;
    for (const s of signs) {
      world.copy(s.anchor).applyMatrix4(globe.matrixWorld);
      normal.copy(s.dir).applyQuaternion(globe.quaternion);
      const facing = normal.z;
      const p = world.clone().project(camera);
      let x = ox + ((p.x + 1) / 2) * rect.width;
      const y = oy + ((1 - p.y) / 2) * rect.height;
      // Keep every sign on screen, even when its post is at the very edge on a phone.
      const half = s.el.offsetWidth / 2 + 8;
      x = Math.min(Math.max(x, half - hostRect.left), innerWidth - hostRect.left - half);
      // Signs on the far side are gone, not ghosted; they come back as the globe turns.
      const show = Math.min(1, Math.max(0, (facing - 0.06) / 0.24));
      const scale = 0.82 + 0.18 * Math.max(0, facing);
      s.item.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%) scale(${scale.toFixed(3)})`;
      s.item.style.opacity = s.el === document.activeElement ? '1' : show.toFixed(3);
      s.item.style.zIndex = String(Math.round(50 + facing * 50));
      s.item.classList.toggle('is-away', show < 0.35 && s.el !== document.activeElement);
    }
  };

  // Posts lean towards the top of the screen whatever way the globe is turned, so each sign
  // visibly stands on its post instead of the post pointing straight at the viewer.
  const inverse = new THREE.Quaternion();
  const lean = new THREE.Vector3();
  const screenUp = new THREE.Vector3(0, 1, 0);
  const tiltPosts = () => {
    inverse.copy(globe.quaternion).invert();
    for (const s of signs) {
      normal.copy(s.dir).applyQuaternion(globe.quaternion);
      lean.copy(normal).addScaledVector(screenUp, 1.2).normalize();
      if (lean.dot(normal) < 0.3) lean.copy(normal).addScaledVector(screenUp, 0.4).normalize();
      lean.applyQuaternion(inverse);
      s.post.quaternion.setFromUnitVectors(up, lean);
      s.anchor.copy(s.post.position).addScaledVector(lean, POST_HEIGHT + 0.02);
    }
  };

  const draw = () => {
    globe.rotation.set(state.pitch, state.yaw, 0, 'XYZ');
    globe.updateMatrixWorld();
    tiltPosts();
    globe.updateMatrixWorld();
    renderer.render(scene, camera);
    placeSigns();
  };

  new ResizeObserver(() => {
    resize();
    draw();
  }).observe(host);
  resize();

  // ---- Loop: only while visible, and never when motion is reduced and nothing is moving.
  let raf = 0;
  let last = performance.now();
  let onScreen = true;
  let dragging = false;

  const shortest = (from: number, to: number) => {
    let d = (to - from) % (Math.PI * 2);
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    return from + d;
  };

  const tick = (t: number) => {
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    // The globe only drifts on its own when nobody is pointing at it or has a sign focused.
    const idle = t - state.lastInput > 2600 && !hovering && !host.contains(document.activeElement);

    if (state.target && !dragging) {
      const k = 1 - Math.exp(-7 * dt);
      state.yaw += (state.target.yaw - state.yaw) * k;
      state.pitch += (state.target.pitch - state.pitch) * k;
      state.vYaw = state.vPitch = 0;
      if (Math.abs(state.target.yaw - state.yaw) < 0.002 && Math.abs(state.target.pitch - state.pitch) < 0.002) {
        state.target = null;
      }
    } else if (!dragging) {
      state.yaw += state.vYaw * dt;
      state.pitch += state.vPitch * dt;
      const decay = Math.exp(-3 * dt);
      state.vYaw *= decay;
      state.vPitch *= decay;
      if (idle && !still.matches) {
        state.vYaw += (0.1 - state.vYaw) * (1 - Math.exp(-0.8 * dt));
        state.pitch += (0.45 - state.pitch) * (1 - Math.exp(-0.5 * dt));
      }
    }
    state.pitch = Math.max(-0.9, Math.min(1.1, state.pitch));
    draw();

    const moving = dragging || !!state.target || Math.abs(state.vYaw) > 0.002 || Math.abs(state.vPitch) > 0.002;
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

  /** Turn the globe so a signpost faces the visitor. */
  const turnTo = (s: Sign) => {
    const f = faceFor(s.dir);
    state.target = { yaw: shortest(state.yaw, f.yaw), pitch: f.pitch };
    state.lastInput = performance.now();
    if (still.matches) {
      state.yaw = state.target.yaw;
      state.pitch = state.target.pitch;
      state.target = null;
      draw();
      return;
    }
    wake();
  };

  let hovering = false;
  host.addEventListener('pointerenter', () => (hovering = true));
  host.addEventListener('pointerleave', () => {
    hovering = false;
    state.lastInput = performance.now();
  });

  // ---- Drag to spin, with inertia. Drags that start on a sign are left to the sign.
  let px = 0;
  let py = 0;
  let pt = 0;

  host.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || (e.target as Element).closest('[data-sign]')) return;
    dragging = true;
    state.target = null;
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
    if (e.target !== host) return;
    const step = { ArrowLeft: [-0.3, 0], ArrowRight: [0.3, 0], ArrowUp: [0, -0.2], ArrowDown: [0, 0.2] }[e.key];
    if (!step) return;
    e.preventDefault();
    state.target = null;
    state.yaw += step[0];
    state.pitch += step[1];
    state.lastInput = performance.now();
    draw();
    wake();
  });

  // ---- Signs: focus or hover turns the globe to them; choosing one dives in, then goes.
  const dive = (s?: Sign) => {
    if (still.matches) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const begin = performance.now();
      const from = camera.position.clone();
      const to = s ? new THREE.Vector3(0, 0.22, 3.2) : new THREE.Vector3(0, 0, 3.3);
      const step = (t: number) => {
        const p = Math.min(1, (t - begin) / 480);
        const e = 1 - Math.pow(1 - p, 3);
        camera.position.lerpVectors(from, to, e);
        camera.lookAt(0, 0, 0);
        draw();
        if (p < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  };

  const settleCamera = () => {
    camera.position.set(0, 0, CAMERA_Z);
    camera.lookAt(0, 0, 0);
    draw();
  };

  for (const s of signs) {
    s.el.addEventListener('focus', () => turnTo(s));
    s.el.addEventListener('pointerenter', () => turnTo(s));
    s.el.addEventListener('click', async (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const href = s.el.getAttribute('href')!;
      turnTo(s);
      if (!still.matches) await new Promise((r) => setTimeout(r, 380));
      await dive(s);
      if (href.startsWith('#')) {
        document.querySelector(href)?.scrollIntoView({ behavior: still.matches ? 'auto' : 'smooth' });
        history.pushState(null, '', href);
        setTimeout(settleCamera, 600);
      } else {
        location.href = href;
      }
    });
  }

  // Coming back from another page (bfcache), put the camera back.
  addEventListener('pageshow', settleCamera);

  draw();
  host.classList.add('is-live');
  wake();

  return { dive: () => dive() };
}
