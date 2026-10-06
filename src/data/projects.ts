export type Shell = 'lemon' | 'mint' | 'blue' | 'orange' | 'white';
export type Crew = 'solo' | 'team' | 'wip';

export interface Link {
  label: string;
  href: string;
  kind: 'repo' | 'live' | 'invite';
}

export interface Project {
  slug: string;
  no: number;
  name: string;
  /** Two short words max, printed on the capsule label. */
  short: string;
  shell: Shell;
  crew: Crew;
  /** Who it was built with, when the repo lives under a collaborator. */
  crewNote?: string;
  category: 'Bot' | 'Game' | 'Web' | 'Config' | 'Desktop';
  tech: string[];
  /** One line for the lineup card and the dispenser tray. */
  line: string;
  body: string[];
  links: Link[];
  images: string[];
  users?: { count: string; label: string };
  /** Capsule size relative to the base radius. */
  size: number;
}

export const projects: Project[] = [
  {
    slug: 'jantleman-bot',
    no: 1,
    name: 'The Jantleman Bot',
    short: 'Jantleman',
    shell: 'lemon',
    crew: 'solo',
    category: 'Bot',
    tech: ['Python', 'Discord', 'SQLite'],
    line: 'A reputation database for Discord trading communities.',
    body: [
      'A reputation database bot built to make trading safer in games that have no safe trading system of their own.',
      'Players look each other up before a trade, and server staff get a full set of admin tools to manage reports and records.',
    ],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/SamMcAulay/The-Jantleman-Bot', kind: 'repo' },
      { label: 'Join a server', href: 'https://discord.gg/s3yM8rwN2R', kind: 'invite' },
    ],
    images: ['/Pics/Jan/Jan1.png', '/Pics/Jan/Jan2.png', '/Pics/Jan/Jan3.png', '/Pics/Jan/Jan4.png'],
    users: { count: '50,000+', label: 'users served' },
    size: 1.32,
  },
  {
    slug: 'flicker-bot',
    no: 2,
    name: 'Flicker Bot',
    short: 'Flicker',
    shell: 'mint',
    crew: 'solo',
    category: 'Bot',
    tech: ['Python', 'Discord', 'SQLite'],
    line: 'A do-it-all Discord bot with games, an economy and tickets.',
    body: [
      'A do-it-all Discord bot: games, an economy with a shop, ticket support and more.',
      'It also runs a custom API endpoint that sends user statistics to a website for display.',
    ],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/SamMcAulay/Flicker-bot', kind: 'repo' },
      { label: 'Join a server', href: 'https://discord.gg/gugU5CkGdu', kind: 'invite' },
    ],
    images: ['/Pics/Flicker/Flicker1.png', '/Pics/Flicker/Flicker2.png', '/Pics/Flicker/Flicker3.png', '/Pics/Flicker/Flicker4.png'],
    users: { count: '100+', label: 'users served' },
    size: 1.12,
  },
  {
    slug: 'math-game',
    no: 3,
    name: 'Math Game Web App',
    short: 'Math Game',
    shell: 'blue',
    crew: 'team',
    crewNote: 'Team project, repo hosted by Carlbytes',
    category: 'Web',
    tech: ['C++', 'Crow', 'Docker', 'CI/CD'],
    line: 'A C++ backend serving a web front end, shipped by CI/CD.',
    body: [
      'A full-stack web app with a C++ backend and a web front end, connected with Crow.',
      'A CI/CD pipeline builds the app image with Docker and ships it to production.',
    ],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Carlbytes/Math-Game-Web-App', kind: 'repo' },
      { label: 'Live demo', href: 'https://se3-mathgame.duckdns.org/', kind: 'live' },
    ],
    images: [],
    size: 1,
  },
  {
    slug: 'battleship',
    no: 4,
    name: 'Battleship',
    short: 'Battleship',
    shell: 'orange',
    crew: 'team',
    crewNote: 'Team project, repo hosted by Carlbytes',
    category: 'Game',
    tech: ['C++', 'SFML', 'Networking'],
    line: 'Multiplayer battleship over LAN and WAN.',
    body: [
      'Multiplayer battleship with LAN and WAN support.',
      'Built in C++ with SFML for speed, networking and real-time play.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/Carlbytes/BattleShip_cpp_Game', kind: 'repo' }],
    images: [],
    size: 1,
  },
  {
    slug: 'space-vr-explorer',
    no: 5,
    name: 'Space VR Explorer',
    short: 'Space VR',
    shell: 'white',
    crew: 'team',
    crewNote: 'Hackathon Athlone 2025 team, repo hosted by Carlbytes',
    category: 'Game',
    tech: ['Unity', 'VR', 'C#', 'ShaderLab', 'NASA API'],
    line: 'A VR simulation of asteroid impacts, built at a hackathon.',
    body: [
      'A virtual reality simulation of the effects of real-world theoretical asteroid impacts.',
      'Built for Hackathon Athlone 2025, pulling data from the NASA API.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/Carlbytes/Hackahton2025', kind: 'repo' }],
    images: [],
    size: 1,
  },
  {
    slug: 'moonhaul',
    no: 6,
    name: 'Moonhaul',
    short: 'Moonhaul',
    shell: 'lemon',
    crew: 'team',
    crewNote: 'Team project, repo hosted by SamsonA00321296',
    category: 'Game',
    tech: ['Unity', 'HLSL', 'C#'],
    line: 'Split-screen couch co-op: battle friends for the most moons.',
    body: [
      'A split-screen couch co-op game where you battle your friends to collect the most moons.',
      'Uses custom physics and shader meshes.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamsonA00321296/Games-fleadh', kind: 'repo' }],
    images: [],
    size: 1,
  },
  {
    slug: 'laser-game',
    no: 7,
    name: 'Laser Game',
    short: 'Laser',
    shell: 'blue',
    crew: 'solo',
    category: 'Game',
    tech: ['Unity', 'C#'],
    line: 'A procedurally generated horror game built for speedruns.',
    body: [
      'A procedurally generated horror game with a focus on speedruns.',
      'Custom textures and particles create the laser effects.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamMcAulay/laserGame', kind: 'repo' }],
    images: [],
    size: 1,
  },
  {
    slug: 'pangbot',
    no: 8,
    name: 'Pangbot',
    short: 'Pangbot',
    shell: 'mint',
    crew: 'solo',
    category: 'Bot',
    tech: ['Python', 'Twitch'],
    line: 'A Twitch bot that grabs build codes straight from chat.',
    body: [
      'A Twitch bot that automatically picks build codes out of chat.',
      'Written in Python for automated chat interaction and code extraction. Discord integration is planned.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamMcAulay/Pangbot', kind: 'repo' }],
    images: [],
    size: 1,
  },
  {
    slug: 'i3-dotfiles',
    no: 9,
    name: 'i3 Dotfiles',
    short: 'i3 Rice',
    shell: 'orange',
    crew: 'solo',
    category: 'Config',
    tech: ['i3wm', 'picom', 'pywal', 'Bash'],
    line: 'Animated i3 with Wayland-style motion on Xorg.',
    body: [
      'An animated i3 window manager setup built on an experimental picom branch.',
      'It brings Wayland-style animations to Xorg.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamMcAulay/i3_PywalEXP_Dotfiles', kind: 'repo' }],
    images: [],
    size: 0.92,
  },
  {
    slug: 'nvim-config',
    no: 10,
    name: 'Neovim Config',
    short: 'Neovim',
    shell: 'white',
    crew: 'solo',
    category: 'Config',
    tech: ['Neovim', 'Lua'],
    line: 'My daily-driver Neovim, lazy-loaded and kept current.',
    body: [
      'My main Neovim configuration: lazy loading, Mason, Treesitter, Telescope, which-key and bufferline.',
      'A working setup I use every day and update regularly.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamMcAulay/NVIM-Main-conf', kind: 'repo' }],
    images: [],
    size: 0.92,
  },
  {
    slug: 'ncwm',
    no: 11,
    name: 'NCWM',
    short: 'NCWM',
    shell: 'white',
    crew: 'wip',
    category: 'Desktop',
    tech: ['Wayland', 'Compositor', 'GUI config'],
    line: 'A no-code tiling Wayland compositor. Early work in progress.',
    body: [
      'NCWM (No Code Window Manager) is a dynamic tiling Wayland compositor designed for casual users.',
      'Most tiling window managers need a lot of configuration, and learning their config files turns new users away. NCWM replaces that with an intuitive GUI for configuration, so you can customise how windows behave without writing a config.',
      'Power users still get the full config file to tweak by hand. No more panicking when your dotfiles break after an update.',
      'It is an early work in progress with no ETA yet.',
    ],
    links: [],
    images: [],
    size: 1,
  },
];

export const shellColor: Record<Shell, string> = {
  lemon: 'var(--lemon)',
  mint: 'var(--mint)',
  blue: 'var(--blue)',
  orange: 'var(--orange)',
  white: 'var(--shell-white)',
};

export const crewLabel: Record<Crew, string> = {
  solo: 'Solo build',
  team: 'Team build',
  wip: 'In the works',
};

export const pad = (n: number) => String(n).padStart(2, '0');
