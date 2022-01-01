import type { Token as EIP721Token } from '@subgraphs/eip721';
import { EIP721_BASIC_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { metadataAPI, metadataBase64 } from 'utils/metadata';
import { quirkURIQuirks } from 'utils/quirks/uri';
import Asset, { ChainIndicator } from '../Asset';

export interface MainnetEIP721AssetProps {
	token: EIP721Token;
}

const MainnetEIP721Asset: React.FC<MainnetEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { mainnet } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.uri || !library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP721_BASIC_ABI, chainId === SupportedChainId.MAINNET ? library : mainnet);
			const contractURI: string = await contract.tokenURI(token.identifier);
			const [uri, uriStructure, shouldProxy] = quirkURIQuirks(contractURI);

			if (uriStructure.protocol === 'data:') {
				const [metadata_, valid_] = await metadataBase64(uri);
				setValid(valid_);
				setMetadata(metadata_);
			} else if (uriStructure.protocol.includes('http') || uriStructure.protocol === 'ipfs:') {
				const [metadata_, valid_] = await metadataAPI(
					uri,
					chainId,
					{ identifier: token.identifier, contract: { id: token.registry.id } },
					shouldProxy
				);
				setValid(valid_);
				setMetadata(metadata_);
			}

			try {
				if (!token.registry.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<Asset
			indicator={ChainIndicator.Mainnet}
			collection={token.registry.name || collection}
			name={metadata?.name || token.identifier.toString()}
			image={metadata?.image || metadata?.image_url}
		/>
	);
};

export default MainnetEIP721Asset;
