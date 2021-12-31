import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { Query as EthEIP721Query } from '@subgraphs/eip721';
import type { Query as EthEIP1155Query } from '@subgraphs/eip1155';
import { baseLink } from './links';

export const client = new ApolloClient({
	link: baseLink,
	cache: new InMemoryCache()
});

export type EthEIP721Response<K extends keyof Omit<EthEIP721Query, '__typename'>> = Record<K, Omit<EthEIP721Query[K], '__typename'>>;
export type EthEIP1155Response<K extends keyof Omit<EthEIP1155Query, '__typename'>> = Record<K, Omit<EthEIP1155Query[K], '__typename'>>;
