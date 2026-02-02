import { NextRequest, NextResponse } from 'next/server';
import { generateERC20, ERC20_DEPLOY_SCRIPT } from '@/lib/contracts/erc20';
import { generateERC721 } from '@/lib/contracts/erc721';
import { generateGovernor } from '@/lib/contracts/governor';
import { CONTRACT_TEMPLATES } from '@/lib/contracts';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({
      templates: CONTRACT_TEMPLATES,
      usage: 'GET /api/contracts?type=erc20&name=MyToken&symbol=MTK',
    });
  }

  const name = searchParams.get('name') || 'MyToken';
  const symbol = searchParams.get('symbol') || 'MTK';

  try {
    let contract: string;
    let deployScript: string | null = null;

    switch (type) {
      case 'erc20':
        contract = generateERC20({
          name,
          symbol,
          initialSupply: searchParams.get('supply') || '1000000',
          decimals: Number(searchParams.get('decimals') || 18),
          burnable: searchParams.get('burnable') === 'true',
          mintable: searchParams.get('mintable') === 'true',
          pausable: searchParams.get('pausable') === 'true',
        });
        deployScript = ERC20_DEPLOY_SCRIPT.replace('TOKEN_NAME', name);
        break;

      case 'erc721':
        contract = generateERC721({
          name,
          symbol,
          baseUri: searchParams.get('baseUri') || '',
          maxSupply: Number(searchParams.get('maxSupply') || 10000),
          mintPrice: searchParams.get('mintPrice') || '0.01',
          royaltyBps: Number(searchParams.get('royaltyBps') || 500),
          enumerable: searchParams.get('enumerable') !== 'false',
        });
        break;

      case 'governor':
        contract = generateGovernor({
          name,
          tokenName: searchParams.get('tokenName') || 'GovernanceToken',
          votingDelay: Number(searchParams.get('votingDelay') || 7200),
          votingPeriod: Number(searchParams.get('votingPeriod') || 50400),
          quorumPercent: Number(searchParams.get('quorumPercent') || 4),
          proposalThreshold: Number(searchParams.get('proposalThreshold') || 0),
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown contract type: ${type}. Available: erc20, erc721, governor` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      type,
      name,
      symbol,
      contract,
      deployScript,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate contract', details: String(error) },
      { status: 500 }
    );
  }
}
