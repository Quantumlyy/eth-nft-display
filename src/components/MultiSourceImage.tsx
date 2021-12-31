import React from 'react';
import { resolveIPFS } from 'utils/ipfs';

export interface MultiSourceImageProps {
	src: string;
	className?: string;
	alt?: string;
}

const MultiSourceImage: React.FC<MultiSourceImageProps> = ({ src: uri, className, alt }) => {
	const uriStructure = new URL(uri);

	if (uriStructure.protocol === 'ipfs:') uri = resolveIPFS(uri);

	return <img src={uri} className={className} alt={alt} loading="lazy" />;
};

export default MultiSourceImage;
