import type { Erc721Token } from '@subgraphs/eip721-matic';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset from '../Asset';

export interface BobaEIP721AssetProps {
	token: Erc721Token;
}

const BobaEIP721Asset: React.FC<BobaEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const boba = useProviders()[SupportedChainId.BOBA];
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.BOBA, token.contract.id, token.identifier));

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
						name: token.contract.name || undefined
					}
				},
				activeChainId: chainId,
				displayChainId: SupportedChainId.BOBA,
				library,
				native: boba,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <Asset chain={SupportedChainId.BOBA} collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} />;
};

export default BobaEIP721Asset;
