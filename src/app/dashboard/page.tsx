'use client';

import { useState } from 'react';

const TEMPLATES = [
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace',
    icon: '🖼️',
    description: 'Token-gated marketplace with royalties and auction support',
    tags: ['ERC-721', 'Marketplace', 'Royalties'],
  },
  {
    id: 'defi-dashboard',
    name: 'DeFi Dashboard',
    icon: '📊',
    description: 'Portfolio tracker with swap integration and yield monitoring',
    tags: ['ERC-20', 'DeFi', 'Analytics'],
  },
  {
    id: 'dao-governance',
    name: 'DAO Governance',
    icon: '🏛️',
    description: 'On-chain voting, proposal management, and treasury control',
    tags: ['Governor', 'Timelock', 'Voting'],
  },
  {
    id: 'token-launch',
    name: 'Token Launch',
    icon: '🚀',
    description: 'ERC-20 token with vesting, airdrop, and liquidity bootstrap',
    tags: ['ERC-20', 'Vesting', 'Airdrop'],
  },
  {
    id: 'web3-social',
    name: 'Web3 Social',
    icon: '💬',
    description: 'Decentralized social platform with on-chain identity',
    tags: ['Identity', 'Social', 'IPFS'],
  },
  {
    id: 'custom',
    name: 'Custom Project',
    icon: '✨',
    description: 'Describe your project and let AI generate the scaffold',
    tags: ['AI-Powered', 'Custom'],
  },
];

type Step = 'select' | 'configure' | 'generate';

export default function Dashboard() {
  const [step, setStep] = useState<Step>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<{ path: string; type: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    setStep('configure');
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setStep('generate');
    try {
      const res = await fetch('/api/scaffold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          description,
          template: selectedTemplate,
          features: [],
          chain: 'ethereum',
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setGeneratedFiles(data.project.files || []);
        setGenerated(true);
      } else {
        setError(data.error || 'Generation failed');
      }
    } catch {
      setError('Failed to connect to scaffold API');
    }
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">🦞 Dockyard</a>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="/dashboard" className="text-white font-medium">Dashboard</a>
            <a href="/contracts" className="hover:text-white transition">Contracts</a>
            <a href="/docs" className="hover:text-white transition">Docs</a>
          </nav>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center gap-4 mb-12">
          {(['select', 'configure', 'generate'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === s
                    ? 'bg-blue-500 text-white'
                    : i < ['select', 'configure', 'generate'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-sm ${step === s ? 'text-white' : 'text-slate-400'}`}>
                {s === 'select' ? 'Choose Template' : s === 'configure' ? 'Configure' : 'Generate'}
              </span>
              {i < 2 && <div className="w-16 h-px bg-slate-700 ml-2" />}
            </div>
          ))}
        </div>

        {/* Step 1: Template Selection */}
        {step === 'select' && (
          <div>
            <h1 className="text-3xl font-bold mb-2">What are you building?</h1>
            <p className="text-slate-400 mb-8">Choose a template or describe your project from scratch.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t.id)}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-left hover:border-blue-500 hover:bg-slate-800 transition group"
                >
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">{t.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Configure */}
        {step === 'configure' && (
          <div className="max-w-2xl">
            <button
              onClick={() => { setStep('select'); setSelectedTemplate(null); }}
              className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1"
            >
              ← Back to templates
            </button>
            <h1 className="text-3xl font-bold mb-2">Configure your project</h1>
            <p className="text-slate-400 mb-8">
              Selected: {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="my-awesome-project"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you want to build in detail..."
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={!projectName}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition"
                >
                  🚀 Generate Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generate */}
        {step === 'generate' && (
          <div className="max-w-2xl text-center mx-auto">
            {generating ? (
              <div className="space-y-6 py-12">
                <div className="text-6xl animate-pulse">⚙️</div>
                <h1 className="text-3xl font-bold">Generating your project...</h1>
                <p className="text-slate-400">
                  Setting up {projectName} with {TEMPLATES.find((t) => t.id === selectedTemplate)?.name} template
                </p>
                <div className="flex flex-col gap-2 text-sm text-slate-400 mt-8">
                  <p>✅ Creating project structure</p>
                  <p>✅ Generating smart contracts</p>
                  <p className="animate-pulse">⏳ Setting up CI/CD pipeline...</p>
                </div>
              </div>
            ) : generated ? (
              <div className="space-y-6 py-12">
                <div className="text-6xl">🎉</div>
                <h1 className="text-3xl font-bold">Project Ready!</h1>
                <p className="text-slate-400">
                  {projectName} has been scaffolded with {generatedFiles.length} files.
                </p>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-left mt-8">
                  <h3 className="font-semibold mb-3">📁 Generated Files ({generatedFiles.length})</h3>
                  <div className="space-y-1 max-h-64 overflow-auto">
                    {generatedFiles.map((f, i) => (
                      <div key={i} className="text-sm font-mono flex items-center gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          f.type === 'solidity' ? 'bg-purple-500/20 text-purple-300' :
                          f.type === 'typescript' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-slate-600/50 text-slate-400'
                        }`}>
                          {f.type === 'solidity' ? 'SOL' : f.type === 'typescript' ? 'TS' : 'CFG'}
                        </span>
                        <span className="text-slate-300">{f.path}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 justify-center mt-6">
                  <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition">
                    ⬇️ Download ZIP
                  </button>
                  <button
                    onClick={() => { setStep('select'); setSelectedTemplate(null); setGenerated(false); setProjectName(''); setDescription(''); }}
                    className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition"
                  >
                    Start New Project
                  </button>
                </div>
              </div>
            ) : error ? (
              <div className="space-y-6 py-12">
                <div className="text-6xl">❌</div>
                <h1 className="text-3xl font-bold">Generation Failed</h1>
                <p className="text-red-400">{error}</p>
                <button
                  onClick={() => { setStep('configure'); setError(null); }}
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition"
                >
                  ← Try Again
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
