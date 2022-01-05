import { AlchemyProvider, JsonRpcProvider, Provider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';

const mainnetAlchemyProvider = new AlchemyProvider(SupportedChainId.MAINNET, process.env.NEXT_PUBLIC_MAINNET_KEY);
const polygonAlchemyProvider = new AlchemyProvider(SupportedChainId.POLYGON, process.env.NEXT_PUBLIC_POLYGON_KEY);
const fantomProvider = new JsonRpcProvider('https://rpc.ftm.tools/', SupportedChainId.FANTOM);
const avalancheProvider = new JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc', SupportedChainId.AVALANCHE);
const optimismAlchemyProvider = new AlchemyProvider(SupportedChainId.OPTIMISM, process.env.NEXT_PUBLIC_OPTIMISM_KEY);
const arbitrumAlchemyProvider = new AlchemyProvider(SupportedChainId.ARBITRUM, process.env.NEXT_PUBLIC_ARBITRUM_KEY);
const bobaProvider = new JsonRpcProvider('https://lightning-replica.boba.network', SupportedChainId.BOBA);

export default function useProviders(): { [K in SupportedChainId]: Provider } {
	return {
		[SupportedChainId.MAINNET]: mainnetAlchemyProvider,
		[SupportedChainId.POLYGON]: polygonAlchemyProvider,
		[SupportedChainId.FANTOM]: fantomProvider,
		[SupportedChainId.AVALANCHE]: avalancheProvider,
		[SupportedChainId.OPTIMISM]: optimismAlchemyProvider,
		[SupportedChainId.ARBITRUM]: arbitrumAlchemyProvider,
		[SupportedChainId.BOBA]: bobaProvider
	};
}
