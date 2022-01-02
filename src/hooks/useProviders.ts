import { AlchemyProvider, JsonRpcProvider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';

const mainnetAlchemyProvider = new AlchemyProvider(SupportedChainId.MAINNET, process.env.NEXT_PUBLIC_MAINNET_KEY);
const polygonAlchemyProvider = new AlchemyProvider(SupportedChainId.POLYGON, process.env.NEXT_PUBLIC_POLYGON_KEY);
const fantomProvider = new JsonRpcProvider('https://rpc.ftm.tools/', SupportedChainId.FANTOM);
const optimismAlchemyProvider = new AlchemyProvider(SupportedChainId.OPTIMISM, process.env.NEXT_PUBLIC_OPTIMISM_KEY);
const arbitrumAlchemyProvider = new AlchemyProvider(SupportedChainId.ARBITRUM, process.env.NEXT_PUBLIC_ARBITRUM_KEY);

export default function useProviders() {
	return {
		mainnet: mainnetAlchemyProvider,
		polygon: polygonAlchemyProvider,
		fantom: fantomProvider,
		optimism: optimismAlchemyProvider,
		arbitrum: arbitrumAlchemyProvider
	};
}
