import { Chains } from 'chains';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function shortenHex(hex: string, length = 4) {
	return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}

const ETHERSCAN_NAMES: Record<number, string> = {
	[Chains.EthereumMainnet]: 'ether',
	3: 'ether',
	4: 'ether',
	5: 'ether',
	42: 'ether',
	[Chains.PolygonMainnet]: 'polygon'
};

const ETHERSCAN_PREFIXES: Record<number, string> = {
	[Chains.EthereumMainnet]: '',
	3: 'ropsten.',
	4: 'rinkeby.',
	5: 'goerli.',
	42: 'kovan.',
	[Chains.PolygonMainnet]: ''
};

export enum EtherscanType {
	Account,
	Transaction,
	Block
}

export type EtherscanData = [chainId: number, address: string];

export function formatEtherscanLink(type: EtherscanType, data: EtherscanData) {
	switch (type) {
		case EtherscanType.Account: {
			const [chainId, address] = data;
			return `https://${ETHERSCAN_PREFIXES[chainId]}${ETHERSCAN_NAMES[chainId]}scan.io/address/${address}`;
		}
		case EtherscanType.Transaction: {
			const [chainId, hash] = data;
			return `https://${ETHERSCAN_PREFIXES[chainId]}${ETHERSCAN_NAMES[chainId]}scan.io/tx/${hash}`;
		}
		case EtherscanType.Block: {
			const [chainId, block] = data;
			return `https://${ETHERSCAN_PREFIXES[chainId]}${ETHERSCAN_NAMES[chainId]}scan.io/block/${block}`;
		}
	}
}
