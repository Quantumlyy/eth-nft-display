import { useActiveWeb3React } from './useActiveWeb3React';

export default function useConnectionActive(): boolean {
	const { account, library } = useActiveWeb3React();

	return typeof account === 'string' && Boolean(library);
}
