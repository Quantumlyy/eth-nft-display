import type { Erc1155Token } from '@subgraphs/eip1155-matic';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset from '../Asset';

export interface OptimismEIP1155AssetProps {
	token: Erc1155Token;
}

const OptimismEIP1155Asset: React.FC<OptimismEIP1155AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const { optimism } = useProviders();
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.OPTIMISM, token.contract.id, token.identifier));

	useEffect(() => {
		if (!token || !library || !chainId) {
			setValid(false);
			return;
		}

		dispatch(
			fetchMetadata({
				token: {
					identifier: token.identifier,
					contract: {
						id: token.contract.id,
						name: undefined
					}
				},
				activeChainId: chainId,
				displayChainId: SupportedChainId.OPTIMISM,
				library,
				native: optimism,
				contractABI: ABI.EIP1155
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <Asset chain={SupportedChainId.OPTIMISM} collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} />;
};

export default OptimismEIP1155Asset;
