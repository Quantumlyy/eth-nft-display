import type { ContractInterface } from 'ethers';

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
export const TOKEN_BASE_ABI_STRING = TOKEN_BASE_ABI.toString();

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
export const EIP721_BASIC_ABI_STRING = EIP721_BASIC_ABI.toString();

export const EIP1155_BASIC_ABI = [
	...TOKEN_BASE_ABI,
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256'
			}
		],
		name: 'uri',
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
export const EIP1155_BASIC_ABI_STRING = EIP1155_BASIC_ABI.toString();

export const CRYPTOPUNKS_DATA_ABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		inputs: [
			{ internalType: 'uint8', name: 'index', type: 'uint8' },
			{ internalType: 'bytes', name: 'encoding', type: 'bytes' },
			{ internalType: 'string', name: 'name', type: 'string' }
		],
		name: 'addAsset',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint64', name: 'key1', type: 'uint64' },
			{ internalType: 'uint32', name: 'value1', type: 'uint32' },
			{ internalType: 'uint64', name: 'key2', type: 'uint64' },
			{ internalType: 'uint32', name: 'value2', type: 'uint32' },
			{ internalType: 'uint64', name: 'key3', type: 'uint64' },
			{ internalType: 'uint32', name: 'value3', type: 'uint32' },
			{ internalType: 'uint64', name: 'key4', type: 'uint64' },
			{ internalType: 'uint32', name: 'value4', type: 'uint32' }
		],
		name: 'addComposites',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint8', name: 'index', type: 'uint8' },
			{ internalType: 'bytes', name: '_punks', type: 'bytes' }
		],
		name: 'addPunks',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint16', name: 'index', type: 'uint16' }],
		name: 'punkAttributes',
		outputs: [{ internalType: 'string', name: 'text', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint16', name: 'index', type: 'uint16' }],
		name: 'punkImage',
		outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint16', name: 'index', type: 'uint16' }],
		name: 'punkImageSvg',
		outputs: [{ internalType: 'string', name: 'svg', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{ inputs: [], name: 'sealContract', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [{ internalType: 'bytes', name: '_palette', type: 'bytes' }],
		name: 'setPalette',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
export const CRYPTOPUNKS_DATA_ABI_STRING = CRYPTOPUNKS_DATA_ABI.toString();

export enum ABI {
	Base,
	EIP721,
	EIP1155,
	CryptopunksData
}

export const ABIs: { [K in ABI]: ContractInterface } = {
	[ABI.Base]: TOKEN_BASE_ABI,
	[ABI.EIP721]: EIP721_BASIC_ABI,
	[ABI.EIP1155]: EIP1155_BASIC_ABI,
	[ABI.CryptopunksData]: CRYPTOPUNKS_DATA_ABI
};

export const uriMethods: { [K in ABI]: 'tokenURI' | 'uri' | '' } = {
	[ABI.Base]: '',
	[ABI.EIP721]: 'tokenURI',
	[ABI.EIP1155]: 'uri',
	[ABI.CryptopunksData]: ''
};
