import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Chains } from 'chains';

export const supportedChainIds: number[] = [
	Chains.EthereumMainnet, // Mainet
	Chains.PolygonMainnet // Matic/Polygon
];

export const metamask = new InjectedConnector({
	supportedChainIds
});

export const walletConnect = new WalletConnectConnector({
	supportedChainIds,
	rpc: {
		[Chains.EthereumMainnet]: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_HTTP as string,
		[Chains.PolygonMainnet]: process.env.NEXT_PUBLIC_POLYGON_MAINNET_HTTP as string
	},
	qrcode: true
});
