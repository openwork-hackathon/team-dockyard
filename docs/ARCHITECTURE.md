# Dockyard Architecture

## Overview

Dockyard is a full-stack AI project scaffolding engine. Users describe what they want to build, and Dockyard generates a production-ready project with smart contracts, APIs, CI/CD, and monitoring.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 + React 19 | App UI, project wizard, dashboard |
| Styling | Tailwind CSS 4 | Responsive design system |
| API | Next.js API Routes | Scaffolding engine, template serving |
| AI | OpenAI / Claude API | Project description → scaffold mapping |
| Smart Contracts | Solidity templates | Pre-built contract library |
| Deployment | Vercel | Hosting + CI/CD |
| Language | TypeScript | End-to-end type safety |

## Core Features

### 1. Project Scaffolding Engine (`/api/scaffold`)
- Accept natural language project description
- Parse intent → select matching templates
- Generate project structure with all config files
- Return downloadable zip or GitHub repo init

### 2. Smart Contract Templates (`/api/contracts`)
- ERC-20, ERC-721, ERC-1155 templates
- Customizable parameters (name, symbol, supply, etc.)
- Deployment scripts for major networks
- On-chain verification helpers

### 3. Project Dashboard (`/dashboard`)
- Visual project builder wizard
- Template gallery with previews
- Real-time generation progress
- Download / deploy options

### 4. API Documentation (`/docs`)
- Auto-generated from API routes
- Interactive playground
- Code examples in multiple languages

## Directory Structure

```
team-dockyard/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Project dashboard
│   │   ├── docs/
│   │   │   └── page.tsx          # API documentation
│   │   └── api/
│   │       ├── scaffold/
│   │       │   └── route.ts      # Scaffolding endpoint
│   │       └── contracts/
│   │           └── route.ts      # Contract templates endpoint
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   ├── wizard/               # Project wizard steps
│   │   └── dashboard/            # Dashboard components
│   ├── lib/
│   │   ├── templates/            # Project templates
│   │   ├── contracts/            # Solidity template strings
│   │   └── scaffold.ts           # Core scaffolding logic
│   └── types/
│       └── index.ts              # Shared TypeScript types
├── public/
├── docs/
│   └── ARCHITECTURE.md           # This file
├── package.json
├── tsconfig.json
└── next.config.ts
```

## API Design

### POST /api/scaffold
```json
{
  "description": "A token-gated NFT marketplace with royalties",
  "features": ["erc721", "marketplace", "royalties"],
  "chain": "ethereum"
}
```

Response: Generated project config + file tree

### GET /api/contracts?type=erc721&params=...
Returns customized Solidity contract template

## Development Phases

### Phase 1: Foundation (Current)
- [x] Next.js app initialized
- [ ] Project dashboard UI
- [ ] Basic API routes

### Phase 2: Scaffolding Engine
- [ ] Template library
- [ ] Natural language → template matching
- [ ] Project generation logic

### Phase 3: Smart Contracts
- [ ] Contract template library
- [ ] Parameter customization
- [ ] Deployment scripts

### Phase 4: Polish
- [ ] API documentation page
- [ ] Monitoring dashboard
- [ ] Demo mode

---
*Built by Dockyard team during Openwork Clawathon 🏗️*
