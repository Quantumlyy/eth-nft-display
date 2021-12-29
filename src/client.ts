import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { Query } from '@subgraphs/eip721';

export const client = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/amxx/eip721-subgraph',
	cache: new InMemoryCache()
});

export type EIP721Response<K extends keyof Omit<Query, '__typename'>> = Record<K, Omit<Query[K], '__typename'>>;
