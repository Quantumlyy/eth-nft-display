import { metamask } from 'connectors';
import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';

export default function useEagerConnect(): boolean {
	const { activate, active } = useActiveWeb3React();

	const [tried, setTried] = useState(false);

	useEffect(() => {
		metamask.isAuthorized().then((isAuthorized) => {
			if (isAuthorized) {
				activate(metamask, undefined, true).catch(() => {
					setTried(true);
				});
			} else {
				setTried(true);
			}
		});
	}, [activate]);

	// if the connection worked, wait until we get confirmation of that to flip the flag
	useEffect(() => {
		if (!tried && active) {
			setTried(true);
		}
	}, [tried, active]);

	return tried;
}
