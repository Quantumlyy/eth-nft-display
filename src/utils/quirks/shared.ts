import type { Provider } from '@ethersproject/providers';
import { CRYPTOPUNKS_DATA_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import type { Token } from 'types/token';
import { EthCryptopunksContract, EthCryptopunksDataContract, EthNiftyContract, EthOpenSeaSharedStorefront, MaticOpenSeaSharedStorefront } from '.';

export function quirkEthOSStorefront(uri: string, chainId: number, token: Token, proxy: boolean): [uri: string, proxy: boolean] {
	if (chainId === SupportedChainId.MAINNET && token.contract.id === EthOpenSeaSharedStorefront)
		return [uri.replace('0x{id}', `${token.identifier}`), false];
	return [uri, proxy];
}

export function quirkMaticOSStorefront(uri: string, chainId: number, token: Token, proxy: boolean): [uri: string, proxy: boolean] {
	if (chainId === SupportedChainId.POLYGON && token.contract.id === MaticOpenSeaSharedStorefront)
		return [uri.replace('0x{id}', `${token.identifier}`), false];
	return [uri, proxy];
}

export function quirkEthNifty(uri: string, chainId: number, token: Token, proxy: boolean): [uri: string, proxy: boolean] {
	if (chainId === SupportedChainId.MAINNET && token.contract.id === EthNiftyContract) return [uri.replace('{id}', `${token.identifier}`), false];
	return [uri, proxy];
}

export function quirkSVGImage(uri: string, uriStructure: URL): [uri: string] {
	if (uriStructure.protocol !== 'data:') return [uri];
	const svgPart = uri.split(',')[1];
	if (!svgPart.includes('svg')) return [uri];
	const blob = new Blob([svgPart], { type: 'image/svg+xml' });

	return [URL.createObjectURL(blob)];
}

export async function quirkEthCryptopunksImage(
	contract: string,
	identifier: BigInt,
	displayChainId: number,
	activeChainId: number,
	library: Provider,
	provider: Provider,
	valid: boolean
): Promise<[data: string, valid: boolean]> {
	if (contract !== EthCryptopunksContract || displayChainId !== SupportedChainId.MAINNET) return ['', false];

	const cryptopunksDataContract = new Contract(
		EthCryptopunksDataContract,
		CRYPTOPUNKS_DATA_ABI,
		activeChainId === SupportedChainId.MAINNET ? library : provider
	);
	const punkSvgData = await cryptopunksDataContract.punkImageSvg(identifier);

	return [punkSvgData, valid];
}
