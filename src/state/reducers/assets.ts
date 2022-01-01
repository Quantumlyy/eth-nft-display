import type { Provider } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Token } from '@subgraphs/non-standard-nfts';
import { SupportedChainId } from 'constants/chains';
import type { BaseMetadata } from 'types/metadata';
import { quirkEthCryptopunksImage } from 'utils/quirks/shared';
import type { RootState } from '../index';

// Keys are in the following format "{chainId}-{}-{identifier}"

interface AssetsState {
	metadata: { [K: string]: BaseMetadata };
}

const initialState: AssetsState = {
	metadata: {}
};

interface FetchMainnetCryptopunksMetadataParameters {
	token: Token;
	chainId: number;
	library: Provider;
	mainnet: Provider;
}

interface MetadataSetPayload {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
	data: BaseMetadata;
}

export const fetchMainnetCryptopunksMetadata = createAsyncThunk<BaseMetadata | undefined, FetchMainnetCryptopunksMetadataParameters>(
	'assets/fetchMainnetCryptopunksMetadata',
	async ({ token, chainId, library, mainnet }) => {
		const [image, valid] = await quirkEthCryptopunksImage(
			token.registry.id,
			token.identifier,
			SupportedChainId.MAINNET,
			chainId,
			library,
			mainnet,
			true
		);

		if (!valid) return undefined;
		return {
			name: token.identifier.toString(),
			contract: token.registry.id,
			identifier: token.identifier,
			image
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
			if (action.payload)
				state.metadata[`${SupportedChainId.MAINNET}-${action.payload.contract}-${action.payload.identifier}`] = action.payload;
		});
	}
});

export const { setMetadata } = assetsSlice.actions;

export const selectAssetMetadata = (chainId: SupportedChainId, contract: string, identifier: BigInt) => (state: RootState) =>
	state.assets.metadata[`${chainId}-${contract}-${identifier}`];

export default assetsSlice.reducer;
