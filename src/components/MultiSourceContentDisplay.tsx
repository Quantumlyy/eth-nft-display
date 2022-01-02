import React from 'react';
import { resolveIPFS } from 'utils/ipfs';
import { quirkIPFSGateway, quirkIPFSHash } from 'utils/quirks/ipfs';
import { quirkSVGImage } from 'utils/quirks/shared';

const FALLBACK = 'https://i.ibb.co/q7DP0Dz/no-image.png';

export interface MultiSourceContentDisplayProps {
	src: string;
	className?: string;
	alt?: string;
}

const MultiSourceContentDisplay: React.FC<MultiSourceContentDisplayProps> = ({ src: uri, className, alt }) => {
	[uri] = quirkIPFSHash(uri, false);
	const uriStructure = new URL(uri);

	if (uriStructure.protocol === 'ipfs:') uri = resolveIPFS(uri);
	[uri] = quirkIPFSGateway(uri, false);
	[uri] = quirkSVGImage(uri, uriStructure);

	return (
		<>
			<img src={uri} className={className} alt={alt} loading="lazy" onError={(ev: any) => (ev.target.src = FALLBACK)} />
		</>
	);
};

export default MultiSourceContentDisplay;
