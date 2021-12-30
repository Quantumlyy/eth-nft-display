import { AlchemyProvider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';

const mainnetAlchemyProvider = new AlchemyProvider(SupportedChainId.MAINNET, process.env.NEXT_PUBLIC_MAINNET_KEY);
const optimismAlchemyProvider = new AlchemyProvider(SupportedChainId.OPTIMISM, process.env.NEXT_PUBLIC_OPTIMISM_KEY);
const polygonAlchemyProvider = new AlchemyProvider(SupportedChainId.POLYGON, process.env.NEXT_PUBLIC_POLYGON_KEY);

export default function useAlchemyProviders() {
	return {
		mainnet: mainnetAlchemyProvider,
		optimism: optimismAlchemyProvider,
		polygon: polygonAlchemyProvider
	};
}
