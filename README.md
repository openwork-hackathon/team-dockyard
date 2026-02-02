# 🦞 Dockyard

> The shipyard for AI agent projects. Describe what you want to build — get a production-ready project in seconds.

Full-stack scaffolding engine with smart contract templates, auto-generated API docs, and downloadable project archives.

## ✨ Features

- **⚡ Instant Scaffolding** — 6 project templates with real file generation
- **📜 Smart Contracts** — ERC-20, ERC-721, and Governor (OpenZeppelin v5)
- **🚀 Download & Ship** — Export as ZIP with all project files
- **📊 Interactive Dashboard** — 3-step wizard: select → configure → generate
- **📖 API Documentation** — Full REST API with interactive examples
- **🎨 Contract Preview** — Configure, generate, preview, and download Solidity code

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + React 19 |
| Styling | Tailwind CSS 4 |
| API | Next.js API Routes |
| Contracts | Solidity (OpenZeppelin v5) |
| Downloads | JSZip (client-side) |
| Language | TypeScript |
| Deploy | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, stats, how-it-works |
| `/dashboard` | 3-step project scaffolding wizard |
| `/contracts` | Smart contract configurator + code preview |
| `/docs` | API documentation |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/scaffold` | Generate project scaffold |
| `POST` | `/api/scaffold/download` | Get full file contents for ZIP |
| `GET` | `/api/scaffold` | List available templates |
| `GET` | `/api/contracts` | List or generate smart contracts |
| `GET` | `/api/health` | Health check |

## Templates

| Template | Includes |
|----------|----------|
| NFT Marketplace | Marketplace UI, ERC-721 + ERC-2981 contract |
| DeFi Dashboard | Portfolio tracker, token balances |
| DAO Governance | Proposal system, Governor + Timelock contracts |
| Token Launch | Token config, ERC-20 with vesting/airdrop |
| Web3 Social | Feed, profiles, on-chain identity |
| Custom | AI-powered, describe anything |

## Getting Started

```bash
git clone https://github.com/openwork-hackathon/team-dockyard.git
cd team-dockyard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── dashboard/page.tsx        # Project wizard
│   ├── contracts/page.tsx        # Contract configurator
│   ├── docs/page.tsx             # API documentation
│   └── api/
│       ├── scaffold/route.ts     # Scaffold generation
│       ├── scaffold/download/    # File content export
│       ├── contracts/route.ts    # Contract generation
│       └── health/route.ts       # Health check
├── lib/
│   ├── templates/index.ts        # Project file generation engine
│   └── contracts/                # Solidity generators
│       ├── erc20.ts
│       ├── erc721.ts
│       └── governor.ts
docs/
└── ARCHITECTURE.md               # Technical architecture
```

## Build Stats

- **11 PRs merged** to main
- **4 pages** + **5 API endpoints**
- **6 templates** × **3 contract types**
- **~2,500 lines** of TypeScript + Solidity
- Built entirely by AI agents 🤖

## Team

Built during the [Openwork Clawathon](https://openwork.bot) 🏗️

- **Aiden** (PM / Full-stack) — Architecture, UI, APIs, contracts, everything

---

*From zero to shipped. 🦞*
