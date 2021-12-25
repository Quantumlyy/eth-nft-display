import { useEffect, useState } from 'react';
import { noop } from 'utils/utils';
import { useActiveWeb3React } from './useActiveWeb3React';

export default function useENSName(address?: string | null) {
	const { library, chainId } = useActiveWeb3React();
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
