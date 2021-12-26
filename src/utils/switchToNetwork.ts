// File is based on https://github.com/Uniswap/interface/blob/13c42a384b5099dac7d963bf90c18f065db7ce50/src/utils/switchToNetwork.ts

import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import type { Web3Provider } from '@ethersproject/providers';
import type { Chains } from 'chains';

interface SwitchNetworkArguments {
	library: Web3Provider;
	chainId: Chains;
}

export async function switchToNetwork({ library, chainId }: SwitchNetworkArguments) {
	if (!library?.provider?.request) return;

	const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());

	try {
		await library.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: formattedChainId }]
		});
	} catch (error) {
		// TODO: Implement chain add request
		throw error;
	}
}
