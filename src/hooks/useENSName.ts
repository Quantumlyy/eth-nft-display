import { useEffect, useState } from 'react';
import { noop } from 'utils/utils';
import useProviders from './useProviders';

export default function useENSName(address?: string | null) {
	const { mainnet } = useProviders();
	const [ENSName, setENSName] = useState('');

	// @ts-expect-error Not all code paths return a value.
	useEffect(() => {
		if (mainnet && typeof address === 'string') {
			let stale = false;

			mainnet
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
	}, [mainnet, address]);

	return ENSName;
}
