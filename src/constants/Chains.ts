export interface IChain {
    name: string,
    slug: string,
    network: string,
    symbol: string,
    chainId: number,
    currency: string,
    hexValue: string,
    rpcUrl: string,
    useKeyWithRpcUrl: boolean
}
export const mainnetChains: IChain[] = [
    {
        name: 'Ethereum',
        slug: 'ethereum',
        network: 'ethereum',
        symbol: 'ETH',
        chainId: 1,
        currency: 'ETH',
        hexValue: '0x1',
        rpcUrl: `https://mainnet.infura.io/v3/`,   // add key at the end
        useKeyWithRpcUrl: true
    },
    {
        name: 'Binance Smart Chain',
        slug: 'binance-smart-chain',
        network: 'binance',
        symbol: 'BSC',
        chainId: 56,
        currency: 'BNB',
        hexValue: '0x38',
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        useKeyWithRpcUrl: false
    },
    // {
    //     name: 'Polygon',
    //     slug: 'polygon',
    //     symbol: 'MATIC',
    //     chainId: 137,
    //     hexValue: '0x89',
    //     rpcUrl: 'https://polygon-rpc.com'
    // },
    // {
    //     name: 'Avalanche',
    //     slug: 'avalanche',
    //     symbol: 'AVAX',
    //     chainId: 43114,
    //     hexValue: '0xa86a',
    //     rpcUrl: 'https://rpc.ankr.com/avalanche'
    // },
    // {
    //     name: 'Arbitrum',
    //     slug: 'arbitrum',
    //     symbol: 'ETH', // Arbitrum uses the Ethereum symbol
    //     chainId: 42161,
    //     hexValue: '0xa4b1',
    //     rpcUrl: 'https://arb1.arbitrum.io/rpc'
    // }
];

export const testnetChains: IChain[] = [
    {
        name: 'Ethereum Testnet',
        slug: 'ethereum-testnet',
        network: 'ethereum',
        symbol: 'ETHT',
        currency: 'ETHT',
        chainId: 3, // Ethereum Ropsten Testnet chain ID
        hexValue: '0x3',
        rpcUrl: 'https://ropsten.infura.io/v3/',  // add key at the end
        useKeyWithRpcUrl: true
    },
    {
        name: 'Binance Smart Chain Testnet',
        slug: 'binance-smart-chain-testnet',
        network: 'binance',
        symbol: 'BNBT',
        currency: 'BNBT',
        chainId: 97, // BSC Testnet chain ID
        hexValue: '0x61',
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        useKeyWithRpcUrl: false
    },
    // {
    //     name: 'Polygon Mumbai',
    //     slug: 'polygon-mumbai',
    //     symbol: 'MATIC',
    //     chainId: 80001, // Matic Mumbai Testnet chain ID
    //     hexValue: '0x13881',
    //     rpcUrl: 'https://polygon-mumbai-bor-rpc.publicnode.com'
    // },
    // {
    //     name: 'Avalanche Fuji Testnet',
    //     slug: 'avalanche-fuji-testnet',
    //     symbol: 'AVAX',
    //     chainId: 43113, // Avalanche Fuji C-Chain Testnet chain ID
    //     hexValue: '0xa869',
    //     rpcUrl: 'https://rpc.ankr.com/avalanche_fuji'
    // },
    // {
    //     name: 'Arbitrum Sepolia',
    //     slug: 'arbitrum-sepolia',
    //     symbol: 'ETH', // Arbitrum uses the Ethereum symbol
    //     chainId: 421614, // Arbitrum Testnet chain ID
    //     hexValue: '0x66eee', // The hex value may differ, please verify
    //     rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
    // }
]