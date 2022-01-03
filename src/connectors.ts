import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ALCHEMY_NETWORK_URLS, ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains';

export const metamask = new InjectedConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});

export const walletConnect = new WalletConnectConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
	rpc: {
		...ALCHEMY_NETWORK_URLS,
		[SupportedChainId.FANTOM]: 'https://rpc.ftm.tools/',
		[SupportedChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
		[SupportedChainId.BOBA]: 'https://mainnet.boba.network/'
	},
	qrcode: true
});
