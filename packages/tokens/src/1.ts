import { ChainId, WETH9, Token } from '@pancakeswap/sdk'

const IS_DEV = process.env.NODE_ENV !== 'production'

// Explicit chain IDs
const SEPOLIA_CHAIN_ID = 11155111
const ETH_CHAIN_ID = ChainId.ETHEREUM || 1
const CHAIN_ID = IS_DEV ? SEPOLIA_CHAIN_ID : ETH_CHAIN_ID

// Define tokens manually since @pancakeswap/tokens doesn't export 'tokens'
const createToken = (chainId: number, address: string, decimals: number, symbol: string, name: string) => 
  new Token(chainId, address, decimals, symbol, name)

// Ethereum Mainnet tokens
const ETH_TOKENS = {
  usdt: createToken(1, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  usdc: createToken(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin'),
  dai: createToken(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin'),
  cake: createToken(1, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'CAKE', 'PancakeSwap Token'),
  wbtc: createToken(1, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC'),
}

// Sepolia testnet tokens (using common testnet addresses)
const SEPOLIA_TOKENS = {
  usdt: createToken(SEPOLIA_CHAIN_ID, '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', 6, 'USDT', 'Tether USD'),
  usdc: createToken(SEPOLIA_CHAIN_ID, '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8', 6, 'USDC', 'USD Coin'),
  dai: createToken(SEPOLIA_CHAIN_ID, '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357', 18, 'DAI', 'Dai Stablecoin'),
  cake: createToken(SEPOLIA_CHAIN_ID, '0xFa60D973F7642B748046464e165A65B7323b0DEE', 18, 'CAKE', 'PancakeSwap Token'),
  wbtc: createToken(SEPOLIA_CHAIN_ID, '0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf', 8, 'WBTC', 'Wrapped BTC'),
}

const TOKENS = IS_DEV ? SEPOLIA_TOKENS : ETH_TOKENS

console.log(`Loaded tokens for chain ${CHAIN_ID}:`, Object.keys(TOKENS))

export const ethereumTokens = {
  weth: WETH9[CHAIN_ID],
  usdt: TOKENS.usdt,
  usdc: TOKENS.usdc,
  dai: TOKENS.dai,
  cake: TOKENS.cake,
  wbtc: TOKENS.wbtc,
}