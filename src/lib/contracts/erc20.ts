export interface ERC20Config {
  name: string;
  symbol: string;
  initialSupply?: string;
  decimals?: number;
  burnable?: boolean;
  mintable?: boolean;
  pausable?: boolean;
}

export function generateERC20(config: ERC20Config): string {
  const {
    name,
    symbol,
    initialSupply = '1000000',
    decimals = 18,
    burnable = false,
    mintable = false,
    pausable = false,
  } = config;

  const imports = ['ERC20'];
  const inheritance = ['ERC20'];
  const functions: string[] = [];

  if (burnable) {
    imports.push('ERC20Burnable');
    inheritance.push('ERC20Burnable');
  }
  if (pausable) {
    imports.push('Pausable');
    imports.push('Ownable');
    inheritance.push('Pausable');
    inheritance.push('Ownable');
    functions.push(`
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }`);
  }
  if (mintable) {
    if (!pausable) {
      imports.push('Ownable');
      inheritance.push('Ownable');
    }
    functions.push(`
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }`);
  }

  const ownerParam = inheritance.includes('Ownable') ? 'address initialOwner' : '';
  const ownerInit = inheritance.includes('Ownable') ? ' Ownable(initialOwner)' : '';
  const constructorParams = ownerParam ? `${ownerParam}` : '';

  return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

${imports.map((i) => `import "@openzeppelin/contracts/token/${i === 'ERC20' || i === 'ERC20Burnable' ? 'ERC20' : i === 'Ownable' ? 'access' : 'security'}/${i}.sol";`).join('\n')}

contract ${name} is ${inheritance.join(', ')} {
    constructor(${constructorParams}) ERC20("${name}", "${symbol}")${ownerInit} {
        _mint(msg.sender, ${initialSupply} * 10 ** ${decimals});
    }
${functions.join('\n')}
}
`;
}

export const ERC20_DEPLOY_SCRIPT = `import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await ethers.getContractFactory("TOKEN_NAME");
  const token = await Token.deploy(deployer.address);
  await token.waitForDeployment();

  console.log("Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
`;
