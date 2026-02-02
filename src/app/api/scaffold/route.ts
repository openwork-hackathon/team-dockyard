import { NextRequest, NextResponse } from 'next/server';

interface ScaffoldRequest {
  name: string;
  description?: string;
  template: string;
  features?: string[];
  chain?: string;
}

const TEMPLATE_FILES: Record<string, string[]> = {
  'nft-marketplace': [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
    'src/app/marketplace/page.tsx',
    'src/components/NFTCard.tsx',
    'src/components/ListingForm.tsx',
    'src/lib/contracts.ts',
    'contracts/NFTMarketplace.sol',
    'contracts/deploy.ts',
    'package.json',
    'tsconfig.json',
    'README.md',
  ],
  'defi-dashboard': [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
    'src/app/portfolio/page.tsx',
    'src/components/TokenBalance.tsx',
    'src/components/SwapWidget.tsx',
    'src/lib/defi.ts',
    'contracts/Token.sol',
    'package.json',
    'tsconfig.json',
    'README.md',
  ],
  'dao-governance': [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
    'src/app/proposals/page.tsx',
    'src/components/ProposalCard.tsx',
    'src/components/VotePanel.tsx',
    'src/lib/governance.ts',
    'contracts/Governor.sol',
    'contracts/Timelock.sol',
    'package.json',
    'tsconfig.json',
    'README.md',
  ],
  'token-launch': [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
    'src/app/launch/page.tsx',
    'src/components/TokenConfig.tsx',
    'src/lib/token.ts',
    'contracts/Token.sol',
    'contracts/Vesting.sol',
    'contracts/Airdrop.sol',
    'package.json',
    'tsconfig.json',
    'README.md',
  ],
  'web3-social': [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
    'src/app/feed/page.tsx',
    'src/app/profile/page.tsx',
    'src/components/Post.tsx',
    'src/lib/identity.ts',
    'contracts/Identity.sol',
    'package.json',
    'tsconfig.json',
    'README.md',
  ],
  custom: [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
    'src/lib/utils.ts',
    'package.json',
    'tsconfig.json',
    'README.md',
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ScaffoldRequest;

    if (!body.name || !body.template) {
      return NextResponse.json(
        { error: 'Missing required fields: name, template' },
        { status: 400 }
      );
    }

    const templateFiles = TEMPLATE_FILES[body.template] || TEMPLATE_FILES.custom;

    const files = templateFiles.map((path) => ({
      path: `${body.name}/${path}`,
      type: path.endsWith('.sol') ? 'solidity' : path.endsWith('.ts') || path.endsWith('.tsx') ? 'typescript' : 'config',
    }));

    return NextResponse.json({
      status: 'success',
      project: {
        name: body.name,
        template: body.template,
        description: body.description || '',
        features: body.features || [],
        chain: body.chain || 'ethereum',
        files,
        fileCount: files.length,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    templates: Object.keys(TEMPLATE_FILES),
    version: '0.1.0',
  });
}
