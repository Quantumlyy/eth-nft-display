import { useWeb3React } from '@web3-react/core';
import { metamask } from 'connectors';
import { useEffect, useState } from 'react';

const useEagerConnect = (): boolean => {
	const { activate, active } = useWeb3React();

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
};

export default useEagerConnect;
