import type { Token } from '@subgraphs/non-standard-nfts';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainnetCryptopunksMetadata, selectAssetMetadata } from 'state/reducers/assets';
import Asset from '../Asset';

export interface MainnetNonStandardNFTAssetProps {
	token: Token;
}

const MainnetNonStandardNFTAsset: React.FC<MainnetNonStandardNFTAssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const mainnet = useProviders()[SupportedChainId.MAINNET];
	const dispatch = useDispatch();
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(SupportedChainId.MAINNET, token.registry.id, token.identifier));

	useEffect(() => {
		if (!library || !chainId || !token) {
			setValid(false);
		}

		dispatch(
			fetchMainnetCryptopunksMetadata({
				token: { identifier: token.identifier, contract: { id: token.registry.id } },
				activeChainId: chainId!,
				library: library!,
				native: mainnet
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <Asset chain={SupportedChainId.MAINNET} collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} />;
};

export default MainnetNonStandardNFTAsset;
