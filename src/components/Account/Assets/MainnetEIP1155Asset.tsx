import type { Token as EIP1155Token } from '@subgraphs/eip1155';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset from '../Asset';

export interface MainnetEIP1155AssetProps {
	token: EIP1155Token;
}

const MainnetEIP1155Asset: React.FC<MainnetEIP1155AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const mainnet = useProviders()[SupportedChainId.MAINNET];
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.MAINNET, token.registry.id, token.identifier));

	useEffect(() => {
		if (!token.registry.id || !token.identifier || !library || !chainId) {
			setValid(false);
			return;
		}

		dispatch(
			fetchMetadata({
				token: {
					identifier: token.identifier,
					contract: {
						id: token.registry.id,
						name: undefined
					}
				},
				activeChainId: chainId,
				displayChainId: SupportedChainId.MAINNET,
				library,
				native: mainnet,
				contractABI: ABI.EIP1155
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <Asset chain={SupportedChainId.MAINNET} collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} />;
};

export default MainnetEIP1155Asset;
