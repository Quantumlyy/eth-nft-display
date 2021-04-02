// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function shortenHex(hex: string, length = 4) {
	return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}

const ETHERSCAN_PREFIXES: Record<number, string> = {
	1: '',
	3: 'ropsten.',
	4: 'rinkeby.',
	5: 'goerli.',
	42: 'kovan.'
};

export enum EtherscanType {
	Account,
	Transaction
}

export type EtherscanData = [chainId: number, address: string];

export function formatEtherscanLink(type: EtherscanType, data: EtherscanData) {
	switch (type) {
		case EtherscanType.Account: {
			const [chainId, address] = data;
			return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
		}
		case EtherscanType.Transaction: {
			const [chainId, hash] = data;
			return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
		}
	}
}
