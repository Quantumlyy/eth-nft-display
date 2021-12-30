import type { Token as EIP721Token } from '@subgraphs/eip721';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';

export interface TokenProps {
	token: EIP721Token;
}

const Token: React.FC<TokenProps> = ({ token }) => {
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		if (!token.uri) return;

		// TODO: Convert CORS Proxy URL to ENV variable
		void fetch(`https://eap.quantumly.workers.dev/corsproxy/?apiurl=${token.uri}`)
			.then((res) => res.json())
			.then(setMetadata);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!token.uri) return null;

	return (
		<>
			<div>
				<h3>
					{token.registry.symbol} - #{token.identifier}
				</h3>
				<div>{metadata ? <img src={metadata.image} className="max-h-32" /> : null}</div>
			</div>
		</>
	);
};

export default Token;
