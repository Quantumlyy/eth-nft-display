/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
	MAINNET = 1,

	POLYGON = 137,
	FANTOM = 250,

	OPTIMISM = 10,
	ARBITRUM = 42161
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
	(id) => typeof id === 'number'
) as SupportedChainId[];

export const L1_CHAIN_IDS = [SupportedChainId.MAINNET, SupportedChainId.POLYGON, SupportedChainId.FANTOM] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export const L2_CHAIN_IDS = [SupportedChainId.OPTIMISM, SupportedChainId.ARBITRUM] as const;

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number];

export const ALCHEMY_NETWORK_URLS: { [key in Exclude<SupportedChainId, SupportedChainId.FANTOM>]: string } = {
	[SupportedChainId.MAINNET]: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_MAINNET_KEY}`,
	[SupportedChainId.OPTIMISM]: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_KEY}`,
	[SupportedChainId.POLYGON]: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_KEY}`,
	[SupportedChainId.ARBITRUM]: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ARBITRUM_KEY}`
};

/**
 * This is used to call the add network RPC
 */
interface AddNetworkInfo {
	readonly rpcUrl: string;
	readonly nativeCurrency: {
		name: string; // e.g. 'Goerli ETH',
		symbol: string; // e.g. 'gorETH',
		decimals: number; // e.g. 18,
	};
}

export enum NetworkType {
	L1,
	L2
}

interface BaseChainInfo {
	readonly networkType: NetworkType;
	readonly blockWaitMsBeforeWarning?: number;
	readonly explorer: string;
	readonly label: string;
	readonly addNetworkInfo: AddNetworkInfo;
}

export interface L1ChainInfo extends BaseChainInfo {
	readonly networkType: NetworkType.L1;
}

export interface L2ChainInfo extends BaseChainInfo {
	readonly networkType: NetworkType.L2;
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
	readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo };

export const CHAIN_INFO: ChainInfoMap = {
	[SupportedChainId.MAINNET]: {
		networkType: NetworkType.L1,
		explorer: 'https://etherscan.io/',
		label: 'Ethereum',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: ''
		}
	},
	[SupportedChainId.POLYGON]: {
		networkType: NetworkType.L1,
		// blockWaitMsBeforeWarning: ms`10m`,
		explorer: 'https://polygonscan.com/',
		label: 'Polygon',
		addNetworkInfo: {
			nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
			rpcUrl: 'https://polygon-rpc.com/'
		}
	},
	[SupportedChainId.FANTOM]: {
		networkType: NetworkType.L1,
		// blockWaitMsBeforeWarning: ms`10m`,
		explorer: 'https://ftmscan.com/',
		label: 'Fantom',
		addNetworkInfo: {
			nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
			rpcUrl: 'https://rpc.ftm.tools/'
		}
	},
	[SupportedChainId.OPTIMISM]: {
		networkType: NetworkType.L2,
		// blockWaitMsBeforeWarning: ms`25m`,
		explorer: 'https://optimistic.etherscan.io/',
		label: 'Optimism',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: 'https://mainnet.optimism.io'
		}
	},
	[SupportedChainId.ARBITRUM]: {
		networkType: NetworkType.L2,
		// blockWaitMsBeforeWarning: ms`25m`,
		explorer: 'https://arbiscan.io/',
		label: 'Arbitrum',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: 'https://arb1.arbitrum.io/rpc'
		}
	}
};
