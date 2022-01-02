import type { Token as EIP721Token } from '@subgraphs/eip721';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset, { ChainIndicator } from '../Asset';

export interface MainnetEIP721AssetProps {
	token: EIP721Token;
}

const MainnetEIP721Asset: React.FC<MainnetEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const { mainnet } = useProviders();
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.MAINNET, token.registry.id, token.identifier));

	useEffect(() => {
		if (!token || !token.uri || !library || !chainId) {
			setValid(false);
			return;
		}

		dispatch(
			fetchMetadata({
				token: {
					identifier: token.identifier,
					contract: {
						id: token.registry.id,
						name: token.registry.name || undefined
					}
				},
				activeChainId: chainId,
				displayChainId: SupportedChainId.MAINNET,
				library,
				native: mainnet,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <Asset indicator={ChainIndicator.Mainnet} collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} />;
};

export default MainnetEIP721Asset;
