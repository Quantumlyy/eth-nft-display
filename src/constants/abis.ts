export const TOKEN_BASE_ABI = [
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	}
];

export const EIP721_BASIC_ABI = [
	...TOKEN_BASE_ABI,
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
