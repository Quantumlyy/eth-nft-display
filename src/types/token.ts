export interface TokenContract {
	id: string;
}

export interface Token {
	identifier: BigInt;
	contract: TokenContract;
}
