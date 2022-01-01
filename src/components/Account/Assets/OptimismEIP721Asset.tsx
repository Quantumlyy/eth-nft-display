import type { Erc721Token } from '@subgraphs/eip721-matic';
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

export interface OptimismEIP721AssetProps {
	token: Erc721Token;
}

const OptimismEIP721Asset: React.FC<OptimismEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { optimism } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.contract.id, EIP721_BASIC_ABI, chainId === SupportedChainId.OPTIMISM ? library : optimism);
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
					{ identifier: token.identifier, contract: { id: token.contract.id } },
					shouldProxy
				);
				setValid(valid_);
				setMetadata(metadata_);
			}

			try {
				if (!token.contract.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<Asset
			indicator={ChainIndicator.Optimism}
			collection={token.contract.name || collection}
			name={metadata?.name}
			image={metadata?.image || metadata?.image_url}
		/>
	);
};

export default OptimismEIP721Asset;
