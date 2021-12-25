import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

// Might seem useless at the moment but will assist in using multiple contexts in the future.
export function useActiveWeb3React() {
	const context = useWeb3React<Web3Provider>();

	return context;
}
