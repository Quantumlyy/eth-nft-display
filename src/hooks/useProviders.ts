import { AlchemyProvider, JsonRpcProvider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';

const mainnetAlchemyProvider = new AlchemyProvider(SupportedChainId.MAINNET, process.env.NEXT_PUBLIC_MAINNET_KEY);
const polygonAlchemyProvider = new AlchemyProvider(SupportedChainId.POLYGON, process.env.NEXT_PUBLIC_POLYGON_KEY);
const fantomProvider = new JsonRpcProvider('https://rpc.ftm.tools/', SupportedChainId.FANTOM);
const avalancheProvider = new JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc', SupportedChainId.AVALANCHE);
const optimismAlchemyProvider = new AlchemyProvider(SupportedChainId.OPTIMISM, process.env.NEXT_PUBLIC_OPTIMISM_KEY);
const arbitrumAlchemyProvider = new AlchemyProvider(SupportedChainId.ARBITRUM, process.env.NEXT_PUBLIC_ARBITRUM_KEY);
const bobaProvider = new JsonRpcProvider('https://lightning-replica.boba.network', SupportedChainId.BOBA);

export default function useProviders() {
	return {
		mainnet: mainnetAlchemyProvider,
		polygon: polygonAlchemyProvider,
		fantom: fantomProvider,
		avalanche: avalancheProvider,
		optimism: optimismAlchemyProvider,
		arbitrum: arbitrumAlchemyProvider,
		boba: bobaProvider
	};
}
