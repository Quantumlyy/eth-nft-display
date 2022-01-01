import type { Token as EIP1155Token } from '@subgraphs/eip1155';
import { EIP1155_BASIC_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { metadataAPI, metadataBase64 } from 'utils/metadata';
import { quirkURIQuirks } from 'utils/quirks/uri';
import Asset, { ChainIndicator } from '../Asset';

export interface MainnetEIP1155AssetProps {
	token: EIP1155Token;
}

const MainnetEIP1155Asset: React.FC<MainnetEIP1155AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { mainnet } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.registry.id || !token.identifier || !library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP1155_BASIC_ABI, chainId === SupportedChainId.MAINNET ? library : mainnet);
			const contractURI: string = await contract.uri(token.identifier);
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
				if (!metadata?.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<Asset
			indicator={ChainIndicator.Mainnet}
			collection={collection || `Unidentified contract ${token.registry.id}`}
			name={metadata?.name}
			image={metadata?.image || metadata?.image_url}
		/>
	);
};

export default MainnetEIP1155Asset;
