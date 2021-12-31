import MultiSourceImage from 'components/MultiSourceImage';
import React from 'react';

export interface TokenProps {
	symbol: string;
	id: BigInt;
	image?: string;
}

const Token: React.FC<TokenProps> = ({ symbol, id, image }) => {
	return (
		<>
			<div>
				<h3>
					{symbol} - #{id}
				</h3>
				<div>{image && <MultiSourceImage src={image} className="max-h-32" />}</div>
			</div>
		</>
	);
};

export default Token;
