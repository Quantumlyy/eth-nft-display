import type { Token as EIP721Token } from '@subgraphs/eip721';
import { EIP721_BASIC_ABI } from 'constants/abis';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { resolveIPFS } from 'utils/ipfs';
import Token from '../Token';

export interface EthEIP721AssetProps {
	token: EIP721Token;
}

const EthEIP721Asset: React.FC<EthEIP721AssetProps> = ({ token }) => {
	const { library } = useActiveWeb3React();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.uri || !library) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP721_BASIC_ABI, library);
			let uri: string = await contract.tokenURI(token.identifier);
			const uriStructure = new URL(uri);
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
				await fetch(`${process.env.NEXT_PUBLIC_CORS_PROXY}${uri}`)
					.then((res) => res.json())
					.then(setMetadata);
			}

			try {
				if (!token.registry.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return <Token collection={token.registry.name || collection} image={metadata?.image || metadata?.image_url} />;
};

export default EthEIP721Asset;
