export function resolveIPFS(ipfs: string) {
	return `${process.env.NEXT_PUBLIC_IPFS_RESOLVER}${ipfs.split('ipfs://')[1]}`;
}
