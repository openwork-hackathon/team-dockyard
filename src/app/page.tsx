export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold">🦞 Dockyard</span>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
            <a href="/contracts" className="hover:text-white transition">Contracts</a>
            <a href="/docs" className="hover:text-white transition">Docs</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-8 py-24">
        <div className="max-w-3xl text-center space-y-6">
          <div className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-500/20 mb-2">
            🏗️ Built by AI agents at the Openwork Clawathon
          </div>
          <h1 className="text-6xl font-bold leading-tight">
            Ship your next project<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              in seconds, not weeks
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-xl mx-auto">
            Full-stack scaffolding engine with smart contract templates,
            auto-generated API docs, and downloadable project archives.
          </p>
          <div className="flex gap-4 justify-center pt-2">
            <a
              href="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition"
            >
              Start Building →
            </a>
            <a
              href="/contracts"
              className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-lg font-medium text-lg transition"
            >
              📜 Contracts
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-700/50 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400">6</div>
            <div className="text-sm text-slate-400 mt-1">Project Templates</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">3</div>
            <div className="text-sm text-slate-400 mt-1">Smart Contracts</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">5</div>
            <div className="text-sm text-slate-400 mt-1">API Endpoints</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">.zip</div>
            <div className="text-sm text-slate-400 mt-1">Download Ready</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-blue-500/20">
              1
            </div>
            <h3 className="text-lg font-semibold">Choose a Template</h3>
            <p className="text-sm text-slate-400">
              Pick from NFT marketplace, DeFi dashboard, DAO governance, token launch, social platform, or custom.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-purple-500/20">
              2
            </div>
            <h3 className="text-lg font-semibold">Configure Your Project</h3>
            <p className="text-sm text-slate-400">
              Name it, describe it, and customize contract parameters — token supply, mint price, governance rules.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-green-500/20">
              3
            </div>
            <h3 className="text-lg font-semibold">Download & Ship</h3>
            <p className="text-sm text-slate-400">
              Get a production-ready project with Next.js, Tailwind, TypeScript, and Solidity contracts in a ZIP.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
            <h3 className="text-lg font-semibold mb-2">⚡ Instant Scaffold</h3>
            <p className="text-sm text-slate-400">
              Real file generation — not templates. Every project is a working Next.js app out of the box.
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
            <h3 className="text-lg font-semibold mb-2">📜 Smart Contracts</h3>
            <p className="text-sm text-slate-400">
              OpenZeppelin v5 contracts with configurable parameters. ERC-20, ERC-721, Governor — ready to deploy.
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
            <h3 className="text-lg font-semibold mb-2">🚀 Production Ready</h3>
            <p className="text-sm text-slate-400">
              TypeScript, ESLint, Tailwind CSS 4, proper project structure. Just npm install and start coding.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 px-8 py-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>🦞 Dockyard — The shipyard for AI agent projects</div>
          <div className="flex gap-6">
            <a href="/dashboard" className="hover:text-slate-300 transition">Dashboard</a>
            <a href="/contracts" className="hover:text-slate-300 transition">Contracts</a>
            <a href="/docs" className="hover:text-slate-300 transition">API Docs</a>
            <a href="https://github.com/openwork-hackathon/team-dockyard" className="hover:text-slate-300 transition" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
