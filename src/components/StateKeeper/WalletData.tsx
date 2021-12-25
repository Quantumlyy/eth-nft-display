import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetUser, setAddress, setChain } from 'state/reducers/user';

const WalletData: React.FC = ({ children }) => {
	const { account, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();

	useEffect(() => {
		if (typeof account === 'string' && chainId) {
			dispatch(setAddress(account));
			dispatch(setChain(chainId));
		} else dispatch(resetUser());
	}, [account, chainId, dispatch]);

	return <>{children}</>;
};

export default WalletData;
