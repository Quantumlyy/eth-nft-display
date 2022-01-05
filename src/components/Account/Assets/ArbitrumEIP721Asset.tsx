import type { Erc721Token } from '@subgraphs/eip721-matic';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset from '../Asset';

export interface ArbitrumEIP721AssetProps {
	token: Erc721Token;
}

const ArbitrumEIP721Asset: React.FC<ArbitrumEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const arbitrum = useProviders()[SupportedChainId.ARBITRUM];
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.ARBITRUM, token.contract.id, token.identifier));

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
				displayChainId: SupportedChainId.ARBITRUM,
				library,
				native: arbitrum,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <Asset chain={SupportedChainId.ARBITRUM} collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} />;
};

export default ArbitrumEIP721Asset;
