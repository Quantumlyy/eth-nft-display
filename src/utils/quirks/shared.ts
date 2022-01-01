import { SupportedChainId } from 'constants/chains';
import type { Token } from 'types/token';
import { EthNiftyContract, EthOpenSeaSharedStorefront } from '.';

export function quirkEthOSStorefront(uri: string, chainId: number, token: Token, proxy: boolean): [uri: string, proxy: boolean] {
	if (chainId === SupportedChainId.MAINNET && token.contract.id === EthOpenSeaSharedStorefront)
		return [uri.replace('0x{id}', `${token.identifier}`), false];
	return [uri, proxy];
}

export function quirkEthNifty(uri: string, chainId: number, token: Token, proxy: boolean): [uri: string, proxy: boolean] {
	if (chainId === SupportedChainId.MAINNET && token.contract.id === EthNiftyContract) return [uri.replace('{id}', `${token.identifier}`), false];
	return [uri, proxy];
}
