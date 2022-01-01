import React from 'react';
import { resolveIPFS } from 'utils/ipfs';

const FALLBACK = 'https://i.ibb.co/q7DP0Dz/no-image.png';

export interface MultiSourceContentDisplayProps {
	src: string;
	className?: string;
	alt?: string;
}

const MultiSourceContentDisplay: React.FC<MultiSourceContentDisplayProps> = ({ src: uri, className, alt }) => {
	const uriStructure = new URL(uri);

	if (uriStructure.protocol === 'ipfs:') uri = resolveIPFS(uri);

	return (
		<>
			<img src={uri} className={className} alt={alt} loading="lazy" onError={(ev: any) => (ev.target.src = FALLBACK)} />
		</>
	);
};

export default MultiSourceContentDisplay;
