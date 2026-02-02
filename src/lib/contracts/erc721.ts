export interface ERC721Config {
  name: string;
  symbol: string;
  baseUri?: string;
  maxSupply?: number;
  mintPrice?: string;
  royaltyBps?: number;
  enumerable?: boolean;
}

export function generateERC721(config: ERC721Config): string {
  const {
    name,
    symbol,
    baseUri = '',
    maxSupply = 10000,
    mintPrice = '0.01',
    royaltyBps = 500,
    enumerable = true,
  } = config;

  return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/${enumerable ? 'extensions/ERC721Enumerable' : 'ERC721'}.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ${name} is ${enumerable ? 'ERC721Enumerable' : 'ERC721'}, ERC2981, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = ${maxSupply};
    uint256 public constant MINT_PRICE = ${mintPrice} ether;
    string private _baseTokenURI;
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("${name}", "${symbol}")
        Ownable(initialOwner)
    {
        _baseTokenURI = "${baseUri}";
        _setDefaultRoyalty(initialOwner, ${royaltyBps});
    }

    function mint(uint256 quantity) external payable {
        require(_nextTokenId + quantity <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= MINT_PRICE * quantity, "Insufficient payment");

        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, _nextTokenId);
            _nextTokenId++;
        }
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(${enumerable ? 'ERC721Enumerable' : 'ERC721'}, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
`;
}
