import { projects, crewLabel, shellColor, pad } from '../data/projects';
import { step, type Body, type World } from './drum';

const STEP = 1 / 120;

export function mountMachine() {
  const dome = document.querySelector<HTMLElement>('[data-dome]');
  const crank = document.querySelector<HTMLButtonElement>('[data-crank]');
  if (!dome || !crank) return;

  const caps = [...dome.querySelectorAll<HTMLAnchorElement>('[data-cap]')];
  const prize = document.querySelector<HTMLElement>('[data-prize]')!;
  const prizeCap = document.querySelector<HTMLAnchorElement>('[data-prize-cap]')!;
  const prizeLink = document.querySelector<HTMLAnchorElement>('[data-prize-link]')!;
  const prizeName = document.querySelector<HTMLElement>('[data-prize-name]')!;
  const prizeMeta = document.querySelector<HTMLElement>('[data-prize-meta]')!;
  const status = document.querySelector<HTMLElement>('[data-tray-status]')!;

  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const num = (el: HTMLElement, prop: string) => parseFloat(getComputedStyle(el).getPropertyValue(prop)) || 0;

  const bodies: Body[] = caps.map((el) => ({
    x: num(el, '--x'),
    y: num(el, '--y'),
    r: num(el, '--r'),
    a: num(el, '--a') * (getComputedStyle(el).getPropertyValue('--a').includes('deg') ? Math.PI / 180 : 1),
    vx: 0,
    vy: 0,
    va: 0,
    active: true,
  }));
  const world: World = { bodies, spin: 0, gx: 0, gy: 1 };

  // ---- Render loop: runs only while something is moving and the dome is on screen.
  let raf = 0;
  let last = 0;
  let acc = 0;
  let quiet = 0;
  let onScreen = true;
  let dragging = false;

  const paint = () => {
    bodies.forEach((b, i) => {
      if (!b.active) return;
      const s = caps[i].style;
      s.setProperty('--x', b.x.toFixed(4));
      s.setProperty('--y', b.y.toFixed(4));
      s.setProperty('--a', `${b.a.toFixed(3)}rad`);
    });
  };

  const frame = (t: number) => {
    const dt = Math.min(0.05, (t - last) / 1000 || 0);
    last = t;
    acc += dt;
    while (acc >= STEP) {
      step(world, STEP);
      acc -= STEP;
    }
    paint();

    const energy = bodies.reduce((e, b) => (b.active ? e + Math.abs(b.vx) + Math.abs(b.vy) + Math.abs(b.va) * 0.1 : e), 0);
    quiet = energy < 0.02 && Math.abs(world.spin) < 0.02 && !dragging ? quiet + 1 : 0;
    if (quiet > 30 || !onScreen) {
      raf = 0;
      save();
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  const wake = () => {
    if (still.matches || raf || !onScreen) return;
    quiet = 0;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const save = () => {
    try {
      const out: Record<string, [number, number, number]> = {};
      bodies.forEach((b, i) => {
        if (b.active) out[caps[i].dataset.slug!] = [+b.x.toFixed(4), +b.y.toFixed(4), +b.a.toFixed(3)];
      });
      sessionStorage.setItem('drum', JSON.stringify(out));
    } catch {
      /* storage can be unavailable; the pile simply resets */
    }
  };

  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) wake();
  }).observe(dome);

  addEventListener('pagehide', save);

  // ---- Drag to spin the globe.
  let lastAngle = 0;
  let lastTime = 0;
  let travel = 0;
  let pointer: number | null = null;

  const angleOf = (e: PointerEvent) => {
    const box = dome.getBoundingClientRect();
    return Math.atan2(e.clientY - (box.top + box.height / 2), e.clientX - (box.left + box.width / 2));
  };

  dome.addEventListener('pointerdown', (e) => {
    if (still.matches || e.button !== 0) return;
    pointer = e.pointerId;
    dragging = true;
    travel = 0;
    lastAngle = angleOf(e);
    lastTime = e.timeStamp;
    dome.classList.add('is-dragging');
    wake();
  });

  dome.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointer) return;
    travel += Math.abs(e.movementX) + Math.abs(e.movementY);
    if (travel > 6 && !dome.hasPointerCapture(e.pointerId)) dome.setPointerCapture(e.pointerId);
    const angle = angleOf(e);
    let delta = angle - lastAngle;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    const dt = Math.max(1, e.timeStamp - lastTime) / 1000;
    const target = Math.max(-14, Math.min(14, delta / dt));
    world.spin += (target - world.spin) * 0.5;
    lastAngle = angle;
    lastTime = e.timeStamp;
  });

  const release = (e: PointerEvent) => {
    if (e.pointerId !== pointer) return;
    pointer = null;
    dragging = false;
    dome.classList.remove('is-dragging');
  };
  dome.addEventListener('pointerup', release);
  dome.addEventListener('pointercancel', release);

  // A drag that ends over a capsule must not open it.
  dome.addEventListener(
    'click',
    (e) => {
      if (travel > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
      travel = 0;
    },
    true,
  );

  // ---- Crank: tumble the drum, then drop one capsule into the tray.
  let held = -1;
  let turning = false;

  const dispense = () => {
    const choices = bodies.map((b, i) => i).filter((i) => bodies[i].active);
    const pick = choices[Math.floor(Math.random() * choices.length)];

    if (held >= 0) {
      const back = bodies[held];
      Object.assign(back, { x: (Math.random() - 0.5) * 0.4, y: -0.62, vx: 0, vy: 0.4, va: 0, active: true });
      caps[held].closest('li')!.hidden = false;
    }

    held = pick;
    bodies[pick].active = false;
    caps[pick].closest('li')!.hidden = true;

    const p = projects.find((x) => x.slug === caps[pick].dataset.slug)!;
    const href = caps[pick].getAttribute('href')!;
    prizeCap.href = href;
    prizeCap.dataset.slug = p.slug;
    prizeCap.style.setProperty('--shell', p.crew === 'wip' ? 'transparent' : shellColor[p.shell]);
    prizeLink.href = href;
    prizeName.textContent = p.name;
    prizeMeta.textContent = `No.${pad(p.no)} · ${p.category} · ${p.stats ? `${p.stats[0].count} ${p.stats[0].label}` : crewLabel[p.crew]}`;
    status.hidden = true;
    status.textContent = `You got No.${pad(p.no)}, ${p.name}.`;
    prize.hidden = false;
    prize.classList.remove('is-in');
    void prize.offsetWidth;
    prize.classList.add('is-in');
    const tray = prize.closest('[data-tray]')!;
    tray.classList.remove('is-open');
    void (tray as HTMLElement).offsetWidth;
    tray.classList.add('is-open');
    // The status line is the live region; keep it in the tree for screen readers but visually replaced by the prize.
    status.hidden = false;
    status.classList.add('visually-hidden');
    wake();
  };

  crank.addEventListener('click', () => {
    if (turning) return;
    if (still.matches) {
      dispense();
      return;
    }
    turning = true;
    crank.classList.add('is-turning');
    const dir = Math.random() > 0.5 ? 1 : -1;
    world.spin = 11 * dir;
    bodies.forEach((b) => {
      if (b.active) b.vy -= 0.8 + Math.random() * 0.6;
    });
    wake();
    setTimeout(dispense, 650);
    setTimeout(() => {
      crank.classList.remove('is-turning');
      turning = false;
    }, 900);
  });

  // A small shake on the first visit, so the globe reads as something you can move.
  let fresh = true;
  try {
    fresh = !sessionStorage.getItem('drum');
  } catch {
    /* no storage: treat as a first visit */
  }
  if (fresh && !still.matches) {
    setTimeout(() => {
      world.spin = 3.5;
      bodies.forEach((b) => (b.vy -= 0.5));
      wake();
    }, 500);
  }
}
