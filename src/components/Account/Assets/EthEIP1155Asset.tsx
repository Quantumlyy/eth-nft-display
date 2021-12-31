import type { Token as EIP1155Token } from '@subgraphs/eip1155';
import { EIP1155_BASIC_ABI } from 'constants/abis';
import { EthOpenSeaSharedStorefront } from 'constants/quirks';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { resolveIPFS } from 'utils/ipfs';
import Token from '../Token';

export interface EthEIP1155AssetProps {
	token: EIP1155Token;
}

const EthEIP1155Asset: React.FC<EthEIP1155AssetProps> = ({ token }) => {
	const { library } = useActiveWeb3React();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.registry.id || !token.identifier || !library) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP1155_BASIC_ABI, library);
			let uri: string = await contract.uri(token.identifier);
			const uriStructure = new URL(uri);
			let shouldProxy = true;
			if (uriStructure.protocol === 'ipfs:') uri = resolveIPFS(uri);

			if (uriStructure.protocol === 'data:') {
				const uriBlobParts = uri.split(',');
				const blob = uriBlobParts[uriBlobParts.length - 1];

				try {
					atob(blob);
				} catch {
					setValid(false);
					return;
				}

				setMetadata(JSON.parse(atob(blob)));
			} else if (uriStructure.protocol.includes('http') || uriStructure.protocol === 'ipfs:') {
				if (token.registry.id === EthOpenSeaSharedStorefront) {
					shouldProxy = false;
					uri = uri.replace('0x{id}', `${token.identifier}`);
				}

				await fetch(`${shouldProxy ? process.env.NEXT_PUBLIC_CORS_PROXY : ''}${uri}`)
					.then((res) => res.json())
					.then(setMetadata);
			}

			try {
				if (!metadata?.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return <Token collection={metadata?.name || collection || ''} image={metadata?.image || metadata?.image_url} />;
};

export default EthEIP1155Asset;
