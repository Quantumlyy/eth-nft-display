export interface BaseMetadata {
	name: string;
	description?: string;

	contract?: string;
	identifier?: BigInt;

	image?: string;
	image_url?: string; // ETH-ZUNK
}
