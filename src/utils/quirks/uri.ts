import { quirkIPFSGateway, quirkIPFSHash, quirkIPFSProtocol } from './ipfs';

export function quirkURIQuirks(uri: string): [uri: string, uriStructure: URL, proxy: boolean] {
	let shouldProxy = true;
	[uri, shouldProxy] = quirkIPFSHash(uri, shouldProxy);
	const uriStructure = new URL(uri);

	[uri, shouldProxy] = quirkIPFSProtocol(uri, uriStructure, shouldProxy);
	[uri, shouldProxy] = quirkIPFSGateway(uri, shouldProxy);

	return [uri, uriStructure, shouldProxy];
}
