import { SupportedChainId } from 'constants/chains';
import { useEffect, useState } from 'react';
import { noop } from 'utils/utils';
import useProviders from './useProviders';

export default function useENSDomain(ENSName?: string | null) {
	const mainnet = useProviders()[SupportedChainId.MAINNET];
	const [address, setAddress] = useState('');

	// @ts-expect-error Not all code paths return a value.
	useEffect(() => {
		if (mainnet && typeof ENSName === 'string') {
			let stale = false;

			mainnet
				.resolveName(ENSName)
				.then((addr) => {
					if (!stale && typeof addr === 'string') {
						setAddress(addr);
					}
				})
				.catch(noop);

			return () => {
				stale = true;
				setAddress('');
			};
		}
	}, [mainnet, ENSName]);

	return address;
}
