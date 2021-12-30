import type { Token as EIP721Token } from '@subgraphs/eip721';
import { EIP721_TOKEN_URI_ABI } from 'constants/abis';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { ipfsProxied } from 'utils/ipfs';

export interface TokenProps {
	token: EIP721Token;
}

const Token: React.FC<TokenProps> = ({ token }) => {
	const { library } = useActiveWeb3React();
	const [valid, setValid] = useState(true);
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.uri || !library) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP721_TOKEN_URI_ABI, library);
			let uri: string = await contract.tokenURI(token.identifier);
			const uriStructure = new URL(uri);
			if (uriStructure.protocol === 'ipfs:') {
				uri = ipfsProxied('https://ipfs.io/ipfs/', uri);
			}

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
				// TODO: Convert CORS Proxy URL to ENV variable
				await fetch(`${process.env.NEXT_PUBLIC_CORS_PROXY}${uri}`)
					.then((res) => res.json())
					.then(setMetadata);
			}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<>
			<div>
				<h3>
					{token.registry.symbol} - #{token.identifier}
				</h3>
				<div>
					{metadata ? (
						<img
							src={new URL(metadata.image).protocol === 'ipfs:' ? ipfsProxied('https://ipfs.io/ipfs/', metadata.image) : metadata.image}
							className="max-h-32"
						/>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Token;
