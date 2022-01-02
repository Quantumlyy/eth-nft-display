import { quirkIPFSGateway, quirkIPFSHash, quirkIPFSProtocol } from './ipfs';

export function quirkURIQuirks(uri: string): [uri: string, protocol: string, proxy: boolean] {
	try {
		let shouldProxy = true;
		[uri, shouldProxy] = quirkIPFSHash(uri, shouldProxy);
		const uriStructure = new URL(uri);

		[uri, shouldProxy] = quirkIPFSProtocol(uri, uriStructure.protocol, shouldProxy);
		[uri, shouldProxy] = quirkIPFSGateway(uri, shouldProxy);

		return [uri, uriStructure.protocol, shouldProxy];
	} catch {
		return ['', '', true];
	}
}
