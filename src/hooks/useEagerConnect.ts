import { metamask } from 'connectors';
import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';

export default function useEagerConnect(): boolean {
	const { activate, active } = useActiveWeb3React();

	const [tried, setTried] = useState(false);
	// const [triedSafe, setTriedSafe] = useState(!IS_IN_IFRAME);

	// useEffect(() => {
	// 	if (!triedSafe) {
	// 		gnosisSafe.isSafeApp().then((loadedInSafe) => {
	// 			if (loadedInSafe) {
	// 				activate(gnosisSafe, undefined, true).catch(() => {
	// 					setTriedSafe(true);
	// 				});
	// 			} else {
	// 				setTriedSafe(true);
	// 			}
	// 		});
	// 	}
	// }, [activate, setTriedSafe, triedSafe]);

	useEffect(() => {
		if (!active /* && triedSafe */) {
			metamask.isAuthorized().then((isAuthorized) => {
				if (isAuthorized) {
					activate(metamask, undefined, true).catch(() => {
						setTried(true);
					});
				} else {
					setTried(true);
				}
			});
		}
	}, [activate, active /* , triedSafe */]);

	// if the connection worked, wait until we get confirmation of that to flip the flag
	useEffect(() => {
		if (!tried && active) {
			setTried(true);
		}
	}, [tried, active]);

	return tried;
}
