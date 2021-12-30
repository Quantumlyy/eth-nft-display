// File is based on https://github.com/Uniswap/interface/blob/13c42a384b5099dac7d963bf90c18f065db7ce50/src/utils/switchToNetwork.ts

import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import type { Web3Provider } from '@ethersproject/providers';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';

interface SwitchNetworkArguments {
	library?: Web3Provider;
	chainId: SupportedChainId;
}

export async function switchToNetwork({ library, chainId }: SwitchNetworkArguments) {
	if (!library?.provider?.request) return;

	const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());

	try {
		await library.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: formattedChainId }]
		});
	} catch (error: any) {
		// 4902 is the error code for attempting to switch to an unrecognized chainId
		if (error.code === 4902) {
			const info = CHAIN_INFO[chainId];

			await library.provider.request({
				method: 'wallet_addEthereumChain',
				params: [
					{
						chainId: formattedChainId,
						chainName: info.label,
						rpcUrls: [info.addNetworkInfo.rpcUrl],
						nativeCurrency: info.addNetworkInfo.nativeCurrency,
						blockExplorerUrls: [info.explorer]
					}
				]
			});
			// metamask (only known implementer) automatically switches after a network is added
			// the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
			// metamask's behavior when switching to the current network is just to return null (a no-op)
			try {
				await library.provider.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: formattedChainId }]
				});
			} catch (ierror) {
				console.debug('Added network but could not switch chains', ierror);
			}
		} else {
			throw error;
		}
	}
}
