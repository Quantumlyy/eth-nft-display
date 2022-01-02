import type { Provider } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ABI, ABIs, uriMethods } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import type { BaseMetadata } from 'types/metadata';
import type { Token } from 'types/token';
import { metadataAPI, metadataBase64 } from 'utils/metadata';
import { quirkEthCryptopunksImage } from 'utils/quirks/shared';
import { quirkURIQuirks } from 'utils/quirks/uri';
import type { RootState } from '../index';

// Keys are in the following format "{chainId}-{}-{identifier}"

interface AssetsState {
	metadata: { [K: string]: BaseMetadata | undefined };
}

const initialState: AssetsState = {
	metadata: {}
};

export interface ChainedMetadata extends BaseMetadata {
	chainId: SupportedChainId;
}

interface FetchMetadataParameters {
	token: Token;
	displayChainId?: number;
	activeChainId: number;
	contractABI?: ABI;
	library: Provider;
	native: Provider;
}

interface MetadataSetPayload {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
	data: BaseMetadata;
}

export const fetchMetadata = createAsyncThunk<ChainedMetadata | undefined, FetchMetadataParameters>(
	'fetch/metadata',
	async ({ token, contractABI, activeChainId, displayChainId, library, native }) => {
		if (!displayChainId || !contractABI) return undefined;

		const contract = new Contract(token.contract.id, ABIs[contractABI], activeChainId === displayChainId ? library : native);
		const contractURI: string = await contract[uriMethods[contractABI]](token.identifier);
		let metadata: BaseMetadata | undefined = undefined;
		const [uri, protocol, shouldProxy] = quirkURIQuirks(contractURI);

		if (protocol === 'data:') {
			[metadata] = await metadataBase64(uri);
		} else if (protocol.includes('http') || protocol === 'ipfs:') {
			[metadata] = await metadataAPI(
				uri,
				activeChainId,
				displayChainId,
				{ identifier: token.identifier, contract: { id: token.contract.id } },
				shouldProxy
			);
		}

		try {
			if (metadata && !token.contract.name) metadata.collection = await contract.name();
		} catch {}

		return metadata
			? {
					...metadata,
					name: metadata.name || token.identifier.toString(),
					contract: token.contract.id,
					identifier: token.identifier,
					collection: metadata.collection || token.contract.name || `Unidentified contract ${token.contract.id}`,
					image_final: metadata.image || metadata.image_url || '',
					chainId: displayChainId
			  }
			: undefined;
	}
);

export const fetchMainnetCryptopunksMetadata = createAsyncThunk<ChainedMetadata | undefined, FetchMetadataParameters>(
	'assets/fetchMainnetCryptopunksMetadata',
	async ({ token, activeChainId: chainId, library, native }) => {
		const [image, valid] = await quirkEthCryptopunksImage(
			token.contract.id,
			token.identifier,
			SupportedChainId.MAINNET,
			chainId,
			library,
			native,
			true
		);

		if (!valid) return undefined;
		return {
			name: token.identifier.toString(),
			contract: token.contract.id,
			identifier: token.identifier,
			image_final: image,
			chainId: SupportedChainId.MAINNET
		};
	}
);

export const assetsSlice = createSlice({
	name: 'assets',
	initialState,
	reducers: {
		setMetadata: (state, action: PayloadAction<MetadataSetPayload>) => {
			state.metadata[`${action.payload.chainId}-${action.payload.contract}-${action.payload.identifier}`] = action.payload.data;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMainnetCryptopunksMetadata.fulfilled, (state, action) => {
			if (action.payload) state.metadata[`${action.payload.chainId}-${action.payload.contract}-${action.payload.identifier}`] = action.payload;
		});
		builder.addCase(fetchMetadata.fulfilled, (state, action) => {
			if (action.payload) state.metadata[`${action.payload.chainId}-${action.payload.contract}-${action.payload.identifier}`] = action.payload;
		});
	}
});

export const { setMetadata } = assetsSlice.actions;

export const selectAssetMetadata = (chainId: SupportedChainId, contract: string, identifier: BigInt) => (state: RootState) =>
	state.assets.metadata[`${chainId}-${contract}-${identifier}`];

export default assetsSlice.reducer;
