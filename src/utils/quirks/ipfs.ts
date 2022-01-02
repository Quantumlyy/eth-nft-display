import { replaceIPFSGateway, resolveIPFS } from 'utils/ipfs';

export function quirkIPFSHash(uri: string, proxy: boolean): [uri: string, proxy: boolean] {
	return [uri.startsWith('Qm') ? `ipfs://${uri}` : uri, proxy];
}

export function quirkIPFSProtocol(uri: string, protocol: string, proxy: boolean): [uri: string, proxy: boolean] {
	if (protocol === 'ipfs:') return [resolveIPFS(uri), false];
	return [uri, proxy];
}

export function quirkIPFSGateway(uri: string, proxy: boolean): [uri: string, proxy: boolean] {
	if (uri.includes('ipfs')) return [replaceIPFSGateway(uri), false];
	return [uri, proxy];
}
