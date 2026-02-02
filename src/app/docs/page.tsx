export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">🦞 Dockyard</a>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
            <a href="/docs" className="text-white font-medium">Docs</a>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-slate-400 mb-12">
          Use Dockyard&apos;s API to programmatically scaffold projects and generate smart contracts.
        </p>

        {/* Scaffold API */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">POST /api/scaffold</h2>
          <p className="text-slate-400 mb-4">Generate a new project scaffold from a description.</p>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Request Body</h3>
            <pre className="text-sm text-green-400 font-mono overflow-x-auto">
{`{
  "name": "my-nft-marketplace",
  "description": "A token-gated NFT marketplace with royalties",
  "template": "nft-marketplace",
  "features": ["erc721", "marketplace", "royalties"],
  "chain": "ethereum"
}`}
            </pre>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Response</h3>
            <pre className="text-sm text-blue-400 font-mono overflow-x-auto">
{`{
  "status": "success",
  "project": {
    "name": "my-nft-marketplace",
    "files": [...],
    "downloadUrl": "/api/scaffold/download/abc123"
  }
}`}
            </pre>
          </div>
        </section>

        {/* Contracts API */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">GET /api/contracts</h2>
          <p className="text-slate-400 mb-4">Retrieve smart contract templates with customizable parameters.</p>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Query Parameters</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-4">
                <code className="text-yellow-400 font-mono">type</code>
                <span className="text-slate-400">erc20 | erc721 | erc1155 | governor</span>
              </div>
              <div className="flex gap-4">
                <code className="text-yellow-400 font-mono">name</code>
                <span className="text-slate-400">Contract name (e.g., &quot;MyToken&quot;)</span>
              </div>
              <div className="flex gap-4">
                <code className="text-yellow-400 font-mono">symbol</code>
                <span className="text-slate-400">Token symbol (e.g., &quot;MTK&quot;)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section>
          <h2 className="text-2xl font-bold mb-4">GET /api/health</h2>
          <p className="text-slate-400 mb-4">Check API health status.</p>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <pre className="text-sm text-green-400 font-mono">
{`{
  "status": "ok",
  "version": "0.1.0",
  "uptime": "2h 15m"
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
