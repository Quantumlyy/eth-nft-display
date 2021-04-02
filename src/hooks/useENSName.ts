import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { noop } from 'utils/utils';

export default function useENSName(address?: string | null) {
	const { library, chainId } = useWeb3React<Web3Provider>();
	const [ENSName, setENSName] = useState('');

	// @ts-expect-error Not all code paths return a value.
	useEffect(() => {
		if (library && typeof address === 'string') {
			let stale = false;

			library
				.lookupAddress(address)
				.then((name) => {
					if (!stale && typeof name === 'string') {
						setENSName(name);
					}
				})
				.catch(noop);

			return () => {
				stale = true;
				setENSName('');
			};
		}
	}, [library, address, chainId]);

	return ENSName;
}
