// Tiny circle-in-circle physics for the capsule globe.
// Units are dome radii: the dome is a circle of radius 1 centred on (0, 0), +y points down.

export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Visual tilt in radians and its angular velocity. */
  a: number;
  va: number;
  active: boolean;
}

export interface World {
  bodies: Body[];
  /** Angular velocity of the dome wall in rad/s, set by dragging or the crank. */
  spin: number;
  /** Gravity direction, so a tilted phone can tip the capsules. */
  gx: number;
  gy: number;
}

const GRAVITY = 4.6;
const WALL_BOUNCE = 0.32;
const BODY_BOUNCE = 0.22;
const WALL_GRIP = 0.09;
const AIR = 1.1;
const ITERATIONS = 10;

export function makeWorld(radii: number[], seed = 7): World {
  const rand = mulberry(seed);
  const bodies = radii.map((r, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * (0.9 - r) * 0.8;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 0.2 + (i % 3) * 0.05,
      vx: 0,
      vy: 0,
      r,
      a: (rand() - 0.5) * 0.6,
      va: 0,
      active: true,
    };
  });
  return { bodies, spin: 0, gx: 0, gy: 1 };
}

export function step(world: World, dt: number) {
  const { bodies } = world;
  const live = bodies.filter((b) => b.active);
  const air = Math.exp(-AIR * dt);

  const start = live.map((b) => [b.x, b.y]);
  for (const b of live) {
    b.vx = (b.vx + world.gx * GRAVITY * dt) * air;
    b.vy = (b.vy + world.gy * GRAVITY * dt) * air;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.a += b.va * dt;
  }

  for (let it = 0; it < ITERATIONS; it++) {
    for (let i = 0; i < live.length; i++) {
      for (let j = i + 1; j < live.length; j++) collide(live[i], live[j]);
    }
    for (const b of live) wall(b, world.spin, dt / ITERATIONS);
  }

  // Velocity follows where the solver actually put each capsule, so stacked capsules come to rest
  // instead of storing gravity they can never spend. A little of the solver's bounce is kept.
  live.forEach((b, i) => {
    const vx = (b.x - start[i][0]) / dt;
    const vy = (b.y - start[i][1]) / dt;
    b.vx = vx * 0.85 + b.vx * 0.15;
    b.vy = vy * 0.85 + b.vy * 0.15;
  });

  for (const b of live) {
    // Capsules right themselves when they come to rest, so their labels stay readable.
    const speed = Math.hypot(b.vx, b.vy);
    b.a = wrap(b.a);
    const settle = speed < 0.3 ? 40 : 3;
    b.va += (-b.a * settle - b.va * (speed < 0.3 ? 11 : 2.5)) * dt;
    b.va = Math.max(-14, Math.min(14, b.va));
  }

  world.spin *= Math.exp(-2.6 * dt);
}

function collide(p: Body, q: Body) {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const min = p.r + q.r;
  const d2 = dx * dx + dy * dy;
  if (d2 >= min * min || d2 === 0) return;
  const d = Math.sqrt(d2);
  const nx = dx / d;
  const ny = dy / d;
  const overlap = (min - d) / 2;
  p.x -= nx * overlap;
  p.y -= ny * overlap;
  q.x += nx * overlap;
  q.y += ny * overlap;

  const rel = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
  if (rel < 0) {
    const impulse = (-(1 + BODY_BOUNCE) * rel) / 2;
    p.vx -= impulse * nx;
    p.vy -= impulse * ny;
    q.vx += impulse * nx;
    q.vy += impulse * ny;
    // Glancing contacts set the pair rolling against each other.
    const tangent = (q.vx - p.vx) * -ny + (q.vy - p.vy) * nx;
    p.va -= tangent * 0.35;
    q.va += tangent * 0.35;
  }
}

function wall(b: Body, spin: number, dt: number) {
  const d = Math.hypot(b.x, b.y);
  const limit = 1 - b.r;
  if (d <= limit) return;
  const nx = b.x / d;
  const ny = b.y / d;
  b.x = nx * limit;
  b.y = ny * limit;

  const vn = b.vx * nx + b.vy * ny;
  if (vn > 0) {
    b.vx -= (1 + WALL_BOUNCE) * vn * nx;
    b.vy -= (1 + WALL_BOUNCE) * vn * ny;
  }

  // The spinning wall drags touching capsules along with it.
  const tx = -ny;
  const ty = nx;
  const vt = b.vx * tx + b.vy * ty;
  const wallSpeed = spin * 1;
  // Grip only while the wall turns; a still wall must not act as glue.
  const grip = Math.min(1, Math.abs(spin) / 1.5);
  const pull = (wallSpeed - vt) * Math.min(1, WALL_GRIP * 60 * dt * 4) * grip;
  b.vx += tx * pull;
  b.vy += ty * pull;
  // Rolling friction against the acrylic, so a pile stops rocking in the bowl.
  const rub = (b.vx * tx + b.vy * ty) * 0.012;
  b.vx -= tx * rub;
  b.vy -= ty * rub;
  b.va += (vt / b.r) * 0.02;
}

/** Run the world until it comes to rest. Used at build time so the no-JS page shows a settled pile. */
export function settle(world: World, seconds = 6) {
  const dt = 1 / 120;
  for (let t = 0; t < seconds; t += dt) step(world, dt);
  for (const b of world.bodies) {
    b.vx = b.vy = b.va = 0;
    b.a = wrap(b.a) * 0.4;
  }
  return world;
}

function wrap(a: number) {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const BASE_RADIUS = 0.18;
