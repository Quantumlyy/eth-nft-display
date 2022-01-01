import type { Token } from '@subgraphs/non-standard-nfts';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainnetCryptopunksMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset, { ChainIndicator } from '../Asset';

export interface MainnetNonStandardNFTAssetProps {
	token: Token;
}

const MainnetNonStandardNFTAsset: React.FC<MainnetNonStandardNFTAssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { mainnet } = useAlchemyProviders();
	const dispatch = useDispatch();
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.MAINNET, token.registry.id, token.identifier));

	useEffect(() => {
		if (!library || !chainId || !token) {
			setValid(false);
		}
		dispatch(fetchMainnetCryptopunksMetadata({ token, chainId: chainId!, library: library!, mainnet }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<Asset
			indicator={ChainIndicator.Mainnet}
			collection={token.registry.name!}
			name={token.identifier.toString()}
			image={metadata?.image || ''}
		/>
	);
};

export default MainnetNonStandardNFTAsset;
