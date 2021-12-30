import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { Query } from '@subgraphs/eip721';
import { baseLink } from './links';

export const client = new ApolloClient({
	link: baseLink,
	cache: new InMemoryCache()
});

export type EIP721Response<K extends keyof Omit<Query, '__typename'>> = Record<K, Omit<Query[K], '__typename'>>;
