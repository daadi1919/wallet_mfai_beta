# Makeflouss AI Wallet

A decentralized wallet application for the Makeflouss AI ($MFAI) token on the Binance Smart Chain (BSC). This wallet enables users to interact with the MFAI ecosystem, including token swapping, staking, and liquidity provision.

## Features

- 💱 Swap BNB/MFAI tokens through PancakeSwap integration
- 🏦 Stake MFAI tokens to earn rewards
- 💧 Provide liquidity to MFAI/BNB pool
- 🔒 Stake LP tokens to earn additional MFAI rewards
- 🔐 Secure wallet connection through MetaMask
- ⛓️ Built on Binance Smart Chain
- 🎨 Modern and intuitive user interface

## Smart Contracts

The project includes the following smart contracts:

- `MFAIToken.sol`: The main ERC20 token contract for MFAI
- `MFAIStaking.sol`: Staking contract for MFAI tokens with reward distribution
- `MFAILPStaking.sol`: Staking contract for MFAI/BNB LP tokens

## Prerequisites

- Node.js v16+
- npm or yarn
- MetaMask wallet
- BSC network configured in MetaMask

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wallet_mfai_beta.git
cd wallet_mfai_beta
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:
```env
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed.binance.org
NEXT_PUBLIC_MFAI_TOKEN_ADDRESS=your_token_address
NEXT_PUBLIC_MFAI_STAKING_ADDRESS=your_staking_address
NEXT_PUBLIC_LP_STAKING_ADDRESS=your_lp_staking_address
```

## Development

Run the development server:
```bash
npm run dev
```

## Smart Contract Deployment

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle ethereum-waffle chai @openzeppelin/contracts
```

2. Compile contracts:
```bash
npx hardhat compile
```

3. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network bsc
```

## Testing

Run the test suite:
```bash
npx hardhat test
```

## Security

- All smart contracts are built with OpenZeppelin's secure contract templates
- Includes reentrancy protection
- Owner-only functions for critical operations
- Standard security practices for DeFi applications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Makeflouss AI Team - [@makeflouss](https://twitter.com/makeflouss)

Project Link: [https://github.com/yourusername/wallet_mfai_beta](https://github.com/yourusername/wallet_mfai_beta) 