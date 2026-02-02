'use client';

import { useState } from 'react';

type ContractType = 'erc20' | 'erc721' | 'governor';

interface Template {
  type: ContractType;
  name: string;
  icon: string;
  description: string;
  features: string[];
}

const TEMPLATES: Template[] = [
  {
    type: 'erc20',
    name: 'ERC-20 Token',
    icon: '🪙',
    description: 'Fungible token with optional minting, burning, and pausing',
    features: ['Mintable', 'Burnable', 'Pausable', 'Custom supply'],
  },
  {
    type: 'erc721',
    name: 'ERC-721 NFT',
    icon: '🖼️',
    description: 'Non-fungible token with royalties, enumerable, and metadata',
    features: ['Royalties (ERC-2981)', 'Enumerable', 'Mint price', 'Max supply'],
  },
  {
    type: 'governor',
    name: 'Governor (DAO)',
    icon: '🏛️',
    description: 'On-chain governance with voting, proposals, and timelock',
    features: ['Proposals', 'Voting', 'Quorum', 'Timelock'],
  },
];

export default function ContractsPage() {
  const [selected, setSelected] = useState<ContractType | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ERC-20 config
  const [tokenName, setTokenName] = useState('MyToken');
  const [tokenSymbol, setTokenSymbol] = useState('MTK');
  const [supply, setSupply] = useState('1000000');
  const [mintable, setMintable] = useState(false);
  const [burnable, setBurnable] = useState(false);
  const [pausable, setPausable] = useState(false);

  // ERC-721 config
  const [nftName, setNftName] = useState('MyNFT');
  const [nftSymbol, setNftSymbol] = useState('MNFT');
  const [maxSupply, setMaxSupply] = useState('10000');
  const [mintPrice, setMintPrice] = useState('0.01');

  // Governor config
  const [govName, setGovName] = useState('MyGovernor');
  const [govTokenName, setGovTokenName] = useState('GovernanceToken');
  const [quorum, setQuorum] = useState('4');

  const generate = async () => {
    setLoading(true);
    setCopied(false);
    try {
      let url = '/api/contracts?';
      switch (selected) {
        case 'erc20':
          url += `type=erc20&name=${tokenName}&symbol=${tokenSymbol}&supply=${supply}&mintable=${mintable}&burnable=${burnable}&pausable=${pausable}`;
          break;
        case 'erc721':
          url += `type=erc721&name=${nftName}&symbol=${nftSymbol}&maxSupply=${maxSupply}&mintPrice=${mintPrice}`;
          break;
        case 'governor':
          url += `type=governor&name=${govName}&tokenName=${govTokenName}&quorumPercent=${quorum}`;
          break;
      }
      const res = await fetch(url);
      const data = await res.json();
      setCode(data.contract);
    } catch {
      setCode('// Error generating contract');
    }
    setLoading(false);
  };

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="border-b border-slate-700 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">🦞 Dockyard</a>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
            <a href="/contracts" className="text-white font-medium">Contracts</a>
            <a href="/docs" className="hover:text-white transition">Docs</a>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">Smart Contract Templates</h1>
        <p className="text-slate-400 mb-10">
          Configure and generate production-ready Solidity contracts powered by OpenZeppelin v5.
        </p>

        {/* Template Grid */}
        {!selected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <button
                key={t.type}
                onClick={() => { setSelected(t.type); setCode(null); }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-left hover:border-blue-500 hover:bg-slate-800 transition group"
              >
                <div className="text-4xl mb-3">{t.icon}</div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition">{t.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{t.description}</p>
                <div className="flex flex-wrap gap-2">
                  {t.features.map((f) => (
                    <span key={f} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Config + Preview */}
        {selected && (
          <div>
            <button
              onClick={() => { setSelected(null); setCode(null); }}
              className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1"
            >
              ← Back to templates
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Config Panel */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">
                  {TEMPLATES.find((t) => t.type === selected)?.icon}{' '}
                  {TEMPLATES.find((t) => t.type === selected)?.name}
                </h2>

                {selected === 'erc20' && (
                  <div className="space-y-4">
                    <Field label="Token Name" value={tokenName} onChange={setTokenName} placeholder="MyToken" />
                    <Field label="Symbol" value={tokenSymbol} onChange={setTokenSymbol} placeholder="MTK" />
                    <Field label="Initial Supply" value={supply} onChange={setSupply} placeholder="1000000" />
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <Toggle label="Mintable" checked={mintable} onChange={setMintable} />
                      <Toggle label="Burnable" checked={burnable} onChange={setBurnable} />
                      <Toggle label="Pausable" checked={pausable} onChange={setPausable} />
                    </div>
                  </div>
                )}

                {selected === 'erc721' && (
                  <div className="space-y-4">
                    <Field label="Collection Name" value={nftName} onChange={setNftName} placeholder="MyNFT" />
                    <Field label="Symbol" value={nftSymbol} onChange={setNftSymbol} placeholder="MNFT" />
                    <Field label="Max Supply" value={maxSupply} onChange={setMaxSupply} placeholder="10000" />
                    <Field label="Mint Price (ETH)" value={mintPrice} onChange={setMintPrice} placeholder="0.01" />
                  </div>
                )}

                {selected === 'governor' && (
                  <div className="space-y-4">
                    <Field label="Governor Name" value={govName} onChange={setGovName} placeholder="MyGovernor" />
                    <Field label="Governance Token" value={govTokenName} onChange={setGovTokenName} placeholder="GovernanceToken" />
                    <Field label="Quorum %" value={quorum} onChange={setQuorum} placeholder="4" />
                  </div>
                )}

                <button
                  onClick={generate}
                  disabled={loading}
                  className="mt-6 w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-6 py-3 rounded-lg font-medium transition"
                >
                  {loading ? '⏳ Generating...' : '⚡ Generate Contract'}
                </button>
              </div>

              {/* Code Preview */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">📜 Contract Preview</h2>
                  {code && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const contractName = selected === 'erc20' ? tokenName : selected === 'erc721' ? nftName : govName;
                          const blob = new Blob([code], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${contractName}.sol`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg transition"
                      >
                        ⬇️ .sol
                      </button>
                      <button
                        onClick={copyCode}
                        className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition"
                      >
                        {copied ? '✅ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  )}
                </div>
                {code ? (
                  <pre className="text-sm text-green-400 font-mono overflow-auto max-h-[600px] whitespace-pre-wrap bg-slate-900/50 rounded-lg p-4">
                    {code}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-64 text-slate-500">
                    Configure your contract and click Generate
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition relative ${checked ? 'bg-blue-500' : 'bg-slate-600'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${checked ? 'left-5' : 'left-0.5'}`} />
      </div>
      <span className="text-sm text-slate-300">{label}</span>
    </label>
  );
}
