import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains';

export const metamask = new InjectedConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});

export const walletConnect = new WalletConnectConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
	rpc: {
		[SupportedChainId.MAINNET]: process.env.NEXT_PUBLIC_MAINNET_HTTP as string,
		[SupportedChainId.POLYGON]: process.env.NEXT_PUBLIC_POLYGON_HTTP as string,
		[SupportedChainId.OPTIMISM]: process.env.NEXT_PUBLIC_OPTIMISM_HTTP as string
	},
	qrcode: true
});
