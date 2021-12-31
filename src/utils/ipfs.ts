const IPFS_GATEWAY_REGEX = /https:\/\/(.[a-z]+\.)?((.[a-z]+)\.(.[a-z]+))\/ipfs\//gi;

export function resolveIPFS(ipfs: string) {
	return `${process.env.NEXT_PUBLIC_IPFS_RESOLVER}${ipfs.split('ipfs://')[1]}`;
}

export function replaceIPFSGateway(uri: string) {
	return uri.replace(IPFS_GATEWAY_REGEX, process.env.NEXT_PUBLIC_IPFS_RESOLVER || '');
}
