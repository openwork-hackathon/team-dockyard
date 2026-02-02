export { generateERC20, ERC20_DEPLOY_SCRIPT } from './erc20';
export type { ERC20Config } from './erc20';

export { generateERC721 } from './erc721';
export type { ERC721Config } from './erc721';

export { generateGovernor } from './governor';
export type { GovernorConfig } from './governor';

export type ContractType = 'erc20' | 'erc721' | 'governor';

export interface ContractTemplate {
  type: ContractType;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    type: 'erc20',
    name: 'ERC-20 Token',
    description: 'Fungible token with optional minting, burning, and pausing',
    icon: '🪙',
    features: ['Mintable', 'Burnable', 'Pausable', 'Custom supply'],
  },
  {
    type: 'erc721',
    name: 'ERC-721 NFT',
    description: 'Non-fungible token with royalties, enumerable, and metadata',
    icon: '🖼️',
    features: ['Royalties (ERC-2981)', 'Enumerable', 'Mint price', 'Max supply'],
  },
  {
    type: 'governor',
    name: 'Governor (DAO)',
    description: 'On-chain governance with voting, proposals, and timelock',
    icon: '🏛️',
    features: ['Proposals', 'Voting', 'Quorum', 'Timelock'],
  },
];
