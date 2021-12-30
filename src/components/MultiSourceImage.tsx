import React from 'react';
import { resolveIPFS } from 'utils/ipfs';

export interface MultiSourceImageProps {
	src: string;
	className?: string;
}

const MultiSourceImage: React.FC<MultiSourceImageProps> = ({ src: uri, className }) => {
	const uriStructure = new URL(uri);

	if (uriStructure.protocol === 'ipfs:') uri = resolveIPFS(uri);

	return <img src={uri} className={className} />;
};

export default MultiSourceImage;
