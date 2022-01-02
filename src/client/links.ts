import { ApolloLink, HttpLink } from '@apollo/client';
import { Subgraph } from './graphprotocol/subgraphs';

// TODO: Convert into generating functions

export const ethEIP721Link = new HttpLink({
	uri: Subgraph.MAINNET_EIP721
});
export const ethEIP1155Link = new HttpLink({
	uri: Subgraph.MAINNET_EIP1155
});
export const ethNonStandardLink = new HttpLink({
	uri: Subgraph.MAINNET_NON_STANDARD
});
export const plyEIP721Link = new HttpLink({
	uri: Subgraph.POLYGON_EIP721
});
export const plyEIP1155Link = new HttpLink({
	uri: Subgraph.POLYGON_EIP1155
});
export const ftmEIP721Link = new HttpLink({
	uri: Subgraph.FANTOM_EIP721
});
export const ftmEIP1155Link = new HttpLink({
	uri: Subgraph.FANTOM_EIP1155
});
export const optEIP721Link = new HttpLink({
	uri: Subgraph.OPTIMISM_EIP721
});
export const optEIP1155Link = new HttpLink({
	uri: Subgraph.OPTIMISM_EIP1155
});
export const arbEIP721Link = new HttpLink({
	uri: Subgraph.ARBITRUM_EIP721
});
export const arbEIP1155Link = new HttpLink({
	uri: Subgraph.ARBITRUM_EIP1155
});

/*
This is a weird part of the approach but it's sadly needed. What happens is that we progressively chain ApolloLink splits to cover all bases.
We need to cover the following:
 - Mainnet  EIP721, EIP1155, Non-standard
 - Polygon  EIP721, EIP1155
 - Fantom   EIP721, EIP1155
 - Optimism EIP721, EIP1155
 - Arbitrum EIP721, EIP1155

The naming of the variable follows the style of "{l-chain}{l-standard}_{r-chain}{r-standard}", `l-` and `r-` being the left and right options of an ApolloLink split.
It would be best if `chain` could be 3 letters long for consistency.
*/

// TODO: Convert into generating functions

export const arbEIP1155_ethEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.ARBITRUM_EIP1155, //
	arbEIP1155Link,
	ethEIP721Link
);

export const arbEIP721_arbEIP1155 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.ARBITRUM_EIP721,
	arbEIP721Link,
	arbEIP1155_ethEIP721
);

export const optEIP1155_arbEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.OPTIMISM_EIP1155,
	optEIP1155Link,
	arbEIP721_arbEIP1155
);

export const optEIP721_optEIP1155 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.OPTIMISM_EIP721,
	optEIP721Link,
	optEIP1155_arbEIP721
);

export const ftmEIP1155_optEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.FANTOM_EIP1155,
	ftmEIP1155Link,
	optEIP721_optEIP1155
);

export const ftmEIP721_ftmEIP1155 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.FANTOM_EIP721,
	ftmEIP721Link,
	ftmEIP1155_optEIP721
);

export const plyEIP1155_ftmEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.POLYGON_EIP1155,
	plyEIP1155Link,
	ftmEIP721_ftmEIP1155
);

export const plyEIP721_plyEIP1155 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.POLYGON_EIP721,
	plyEIP721Link,
	plyEIP1155_ftmEIP721
);

export const ethNonStandard_plyEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.MAINNET_NON_STANDARD,
	ethNonStandardLink,
	plyEIP721_plyEIP1155
);

export const ethEIP1155_ethNonStandard = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.MAINNET_EIP1155,
	ethEIP1155Link,
	ethNonStandard_plyEIP721
);

export const ethEIP721_ethEIP1155 = ApolloLink.split(
	(op) => {
		const context = op.getContext();
		return !context.subgraph || context.subgraph === Subgraph.MAINNET_EIP721;
	},
	ethEIP721Link,
	ethEIP1155_ethNonStandard
);

export const baseLink = ethEIP721_ethEIP1155;
