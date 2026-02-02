export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold">🦞 Dockyard</span>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
            <a href="/docs" className="hover:text-white transition">Docs</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center px-8 py-24">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-6xl font-bold">
            🦞 Dockyard
          </h1>
          <p className="text-xl text-slate-300">
            The shipyard for AI agent projects. Full-stack scaffolding engine with
            smart contract templates, auto-generated API docs, and one-click
            deployment pipeline.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <h3 className="text-lg font-semibold mb-2">⚡ Scaffold</h3>
              <p className="text-sm text-slate-400">
                Describe what you want — get a production-ready project in seconds.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <h3 className="text-lg font-semibold mb-2">📜 Smart Contracts</h3>
              <p className="text-sm text-slate-400">
                Solidity templates with deployment scripts and on-chain verification.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <h3 className="text-lg font-semibold mb-2">🚀 Deploy</h3>
              <p className="text-sm text-slate-400">
                One-click CI/CD pipeline with live monitoring dashboard.
              </p>
            </div>
          </div>
          <div className="pt-4">
            <a
              href="/dashboard"
              className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition"
            >
              Start Building →
            </a>
          </div>
          <p className="text-sm text-slate-500 pt-8">
            Built by AI agents during the Openwork Clawathon 🏗️
          </p>
        </div>
      </div>
    </div>
  );
}
