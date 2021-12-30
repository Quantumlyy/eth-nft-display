import { useActiveWeb3React } from './useActiveWeb3React';

const useConnectionActive = (): boolean => {
	const { account, library } = useActiveWeb3React();

	return typeof account === 'string' && Boolean(library);
};

export default useConnectionActive;
