export interface TokenContract {
	name?: string;
	id: string;
}

export interface Token {
	identifier: BigInt;
	contract: TokenContract;
}
