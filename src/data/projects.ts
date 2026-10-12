export type Shell = 'sand' | 'land' | 'ocean' | 'stone' | 'cloud';
export type Crew = 'solo' | 'team' | 'wip' | 'thesis';

export interface Link {
  label: string;
  href: string;
  kind: 'repo' | 'live' | 'invite';
}

export interface Stat {
  count: string;
  label: string;
}

/** One piece of a larger body of work, listed on its project page. */
export interface Part {
  name: string;
  line: string;
  href?: string;
}

export interface Project {
  slug: string;
  no: number;
  name: string;
  shell: Shell;
  crew: Crew;
  /** Who it was built with, when the repo lives under a collaborator. */
  crewNote?: string;
  category: 'Platform' | 'Research' | 'AR' | 'Bot' | 'Game' | 'Web' | 'Config' | 'Desktop';
  tech: string[];
  /** One line for the lineup card and the dispenser tray. */
  line: string;
  body: string[];
  links: Link[];
  images: string[];
  /** Headline numbers, shown on the project cards and the project page. */
  stats?: Stat[];
  /** Recognition the project has received, as stated on Sam's CV. */
  awards?: string[];
  parts?: Part[];
}

const list: Omit<Project, 'no'>[] = [
  {
    slug: 'teg-wardogs',
    name: 'TEG Wardogs',
    shell: 'ocean',
    crew: 'solo',
    crewNote: 'Built and run for The Employed Gamers (TEG) community',
    category: 'Platform',
    tech: ['TypeScript', 'Next.js', 'discord.js', 'Docker', 'Cloudflare', 'Linux VPS'],
    line: 'The live services behind TEG\'s six Wardogs game servers: hosting, stats, status bots and moderation.',
    body: [
      'I run the infrastructure and tooling for The Employed Gamers\' Wardogs servers: six game servers, the Warcon admin panel that manages them, and the services built on top of it.',
      'I host and run the Warcon panel on a Linux VPS with Docker, behind a Cloudflare tunnel and Cloudflare Access. The stats site and bots talk to Warcon\'s API with their own scoped keys, and the public stats site only ever gets view access.',
      'Together these services reach a community of 35,000+ Discord members and 20,000+ in-game players.',
    ],
    parts: [
      {
        name: 'Warcon hosting',
        line: 'The admin panel for all six servers, run on a VPS in Docker, behind a Cloudflare tunnel and Access.',
      },
      {
        name: 'Stats site',
        line: 'Server status, player profiles, match history and leaderboards, built in Next.js on Warcon\'s API.',
        href: 'https://stats.tegwardogs.fyi/',
      },
      {
        name: 'Server status bots',
        line: 'Six Discord bots in one process, each showing a server\'s live player count, faction scores and join code in the sidebar.',
        href: 'https://github.com/SamMcAulay/WDstats',
      },
      {
        name: 'Moderation log bot',
        line: 'Watches all six servers and alerts staff to watched players, unusual kill rates, team kills, kicks and bans.',
        href: 'https://github.com/SamMcAulay/wardogs-modlog',
      },
    ],
    links: [
      { label: 'Live stats site', href: 'https://stats.tegwardogs.fyi/', kind: 'live' },
      { label: 'Stats site repo', href: 'https://github.com/SamMcAulay/TEGwardogsSite', kind: 'repo' },
    ],
    images: [],
    stats: [
      { count: '35,000+', label: 'Discord members' },
      { count: '20,000+', label: 'in-game players' },
    ],
  },
  {
    slug: 'phisher-vs-filter',
    name: 'Phisher vs Filter',
    shell: 'cloud',
    crew: 'thesis',
    crewNote: 'Final-year thesis, approved by my supervisor. Results to come',
    category: 'Research',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'scikit-learn', 'SpamAssassin', 'LoRA'],
    line: 'My thesis: does AI help phishers or spam filters more? I\'m measuring it.',
    body: [
      'Spam filters and the people trying to get phishing emails past them have been in an arms race for twenty years, and both sides now have AI. Plenty of people have an opinion on which side it helps more; my thesis puts a number on it.',
      'I build an attacker and a defender at four levels of sophistication and ask how much each step up in technology buys each side. Every attacker faces every defender, then the strongest pair fight over ten rounds while both keep learning. Snapshots from every round are played against each other afterwards, which shows whether either side really improved or is just running on a treadmill.',
      'The twist is that the defender plays with a handicap. A filter that gets too aggressive blocks real mail, which for a business is often worse than letting a scam through, so each defender is also scored under a fixed limit on false positives.',
      'The result is a single offence-defence balance: above 1 means AI favours attackers, below 1 means it favours defenders. It runs entirely offline, no email can ever be sent, and the generated attack emails won\'t be released.',
    ],
    parts: [
      { name: 'Level 0: no AI', line: 'Attacker: synonym swaps, look-alike characters and padding. Defender: hand-written SpamAssassin rules.' },
      { name: 'Level 1: classic ML', line: 'Attacker: a simple statistical model picks which words to change. Defender: a traditional spam classifier.' },
      { name: 'Level 2: neural', line: 'Attacker: a BERT language model suggests replacement words. Defender: a BERT classifier, trained once.' },
      { name: 'Level 3: generative and adaptive', line: 'Attacker: a small local LLM rewrites the whole email. Defender: a BERT classifier that keeps learning from its own misses.' },
    ],
    links: [],
    images: [],
  },
  {
    slug: 'ai-museum',
    name: 'AR AI Museum Guide',
    shell: 'land',
    crew: 'solo',
    crewNote: 'Commissioned by Khora during my placement, January to May 2026. I was the lead and only developer',
    category: 'AR',
    tech: ['Unity 6', 'AR Foundation', 'C#', 'Node.js', 'Express', 'Gemini Live', 'WebSockets', 'PostgreSQL', 'Railway'],
    line: 'An AR museum guide: point your phone at an exhibit and ask it anything out loud.',
    body: [
      'A conversational museum guide on a phone. The Unity AR app recognises the exhibit in front of the camera, and the visitor asks about it out loud. Answers come back as speech, grounded in that exhibit and fact-checked with Google Search grounding.',
      'There are two voice modes: a quick record-and-answer pipeline over REST, and a live mode that streams audio both ways over WebSockets to Gemini, so visitors can interrupt and ask follow-ups.',
      'API keys never touch the phone: a Node.js and PostgreSQL backend on Railway makes every AI call, and spoken answers are cached per exhibit so repeat questions don\'t spend model time. I gathered requirements in client meetings, deployed through GitHub Actions and gave live demos to the client.',
    ],
    links: [
      { label: 'Server repo', href: 'https://github.com/SamMcAulay/AI_Museum_Server', kind: 'repo' },
      { label: 'Unity app repo', href: 'https://github.com/SamMcAulay/AI_Museum_Front-end', kind: 'repo' },
    ],
    images: [],
  },
  {
    slug: 'jantleman-bot',
    name: 'The Jantleman Bot',
    shell: 'sand',
    crew: 'solo',
    category: 'Bot',
    tech: ['Python', 'Discord', 'SQLite'],
    line: 'A reputation database for Discord trading communities.',
    body: [
      'A reputation database bot built to make trading safer in games that have no safe trading system of their own.',
      'Players look each other up before a trade, and server staff get a full set of admin tools to manage reports and records.',
      'It has its own website at thejantleman.com, with a login-protected dashboard where server admins manage settings and access.',
    ],
    links: [
      { label: 'thejantleman.com', href: 'https://thejantleman.com/', kind: 'live' },
      { label: 'GitHub repo', href: 'https://github.com/SamMcAulay/The-Jantleman-Bot', kind: 'repo' },
      { label: 'Join a server', href: 'https://discord.gg/s3yM8rwN2R', kind: 'invite' },
    ],
    images: ['/Pics/Jan/Jan1.png', '/Pics/Jan/Jan2.png', '/Pics/Jan/Jan3.png', '/Pics/Jan/Jan4.png'],
    stats: [{ count: '50,000+', label: 'users served' }],
  },
  {
    slug: 'flicker-bot',
    name: 'Flicker Bot',
    shell: 'land',
    crew: 'solo',
    category: 'Bot',
    tech: ['Python', 'Discord', 'SQLite'],
    line: 'A do-it-all Discord bot with games, an economy and tickets.',
    body: [
      'A do-it-all Discord bot: games, an economy with a shop, ticket support and more.',
      'A custom API endpoint feeds user statistics to flicker-bot.com, which has a login-protected dashboard covering the economy, leaderboards and tickets, plus a setup guide.',
    ],
    links: [
      { label: 'flicker-bot.com', href: 'https://flicker-bot.com/', kind: 'live' },
      { label: 'GitHub repo', href: 'https://github.com/SamMcAulay/Flicker-bot', kind: 'repo' },
      { label: 'Join a server', href: 'https://discord.gg/gugU5CkGdu', kind: 'invite' },
    ],
    images: ['/Pics/Flicker/Flicker1.png', '/Pics/Flicker/Flicker2.png', '/Pics/Flicker/Flicker3.png', '/Pics/Flicker/Flicker4.png'],
    stats: [{ count: '100+', label: 'users served' }],
  },
  {
    slug: 'janguard',
    name: 'Janguard',
    shell: 'stone',
    crew: 'solo',
    crewNote: 'Built for The Employed Gamers (TEG) community',
    category: 'Bot',
    tech: ['TypeScript', 'discord.js', 'Express', 'Prisma', 'PostgreSQL', 'Steam login'],
    line: 'A Discord bot and web server that manages VIP access for TEG\'s game servers.',
    body: [
      'A Discord bot paired with an Express web server that handles VIP management for the TEG community\'s game servers.',
      'Players sign in with Steam, and staff run verification, role grants, scheduled announcements and sticky messages from Discord. Data lives in PostgreSQL through Prisma.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamMcAulay/Janguard', kind: 'repo' }],
    images: [],
  },
  {
    slug: 'moonhaul',
    name: 'Moonhaul',
    shell: 'sand',
    crew: 'team',
    crewNote: 'Team project, where I was lead game developer. Repo hosted by SamsonA00321296',
    category: 'Game',
    tech: ['Unity', 'HLSL', 'C#'],
    line: 'Award-winning split-screen couch co-op: battle friends for the most moons.',
    body: [
      'A physics-based split-screen couch co-op game where you battle your friends to collect the most moons.',
      'It was showcased at Games Fleadh 2025 and uses custom physics and shader meshes.',
    ],
    awards: ['Best Gameplay', 'Best Use of a Physics Engine', 'Best Soundtrack'],
    links: [{ label: 'GitHub repo', href: 'https://github.com/SamsonA00321296/Games-fleadh', kind: 'repo' }],
    images: [],
  },
  {
    slug: 'math-game',
    name: 'Math Game Web App',
    shell: 'ocean',
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
  },
  {
    slug: 'space-vr-explorer',
    name: 'Space VR Explorer',
    shell: 'cloud',
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
  },
  {
    slug: 'battleship',
    name: 'Battleship',
    shell: 'stone',
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
  },
  {
    slug: 'laser-game',
    name: 'Laser Game',
    shell: 'ocean',
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
  },
  {
    slug: 'pangbot',
    name: 'Pangbot',
    shell: 'land',
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
  },
  {
    slug: 'i3-dotfiles',
    name: 'i3 Dotfiles',
    shell: 'stone',
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
  },
  {
    slug: 'nvim-config',
    name: 'Neovim Config',
    shell: 'cloud',
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
  },
  {
    slug: 'ncwm',
    name: 'NCWM',
    shell: 'cloud',
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
  },
];

export const projects: Project[] = list.map((p, i) => ({ ...p, no: i + 1 }) as Project);

export const shellColor: Record<Shell, string> = {
  sand: 'var(--sand)',
  land: 'var(--land)',
  ocean: 'var(--ocean)',
  stone: 'var(--stone)',
  cloud: 'var(--cloud)',
};

export const crewLabel: Record<Crew, string> = {
  solo: 'Solo build',
  team: 'Team build',
  wip: 'In the works',
  thesis: 'Thesis, in progress',
};

export const pad = (n: number) => String(n).padStart(2, '0');
