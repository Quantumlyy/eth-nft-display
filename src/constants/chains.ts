/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
	MAINNET = 1,

	OPTIMISM = 10,

	POLYGON = 137
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
	(id) => typeof id === 'number'
) as SupportedChainId[];

export const L1_CHAIN_IDS = [SupportedChainId.MAINNET, SupportedChainId.POLYGON] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export const L2_CHAIN_IDS = [SupportedChainId.OPTIMISM] as const;

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number];

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
	[SupportedChainId.POLYGON]: {
		networkType: NetworkType.L1,
		// blockWaitMsBeforeWarning: ms`10m`,
		explorer: 'https://polygonscan.com/',
		label: 'Polygon',
		addNetworkInfo: {
			rpcUrl: 'https://polygon-rpc.com/',
			nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 }
		}
	}
};
