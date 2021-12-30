export const EIP721_TOKEN_URI_ABI = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'tokenURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];
