export function ipfsProxied(proxy: string, ipfs: string) {
	return `${proxy}${ipfs.split('ipfs://')[1]}`;
}
