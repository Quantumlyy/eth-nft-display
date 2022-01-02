export enum GlyphDrawInstruction {
	Nothing = '.',
	BoundCircle = 'O',
	VerticalAndHorizontalLine = '+',
	DiagonalOppositeCornerLines = 'X',
	CenteredVerticalLine = '|',
	CenteredHorizontalLine = '-',
	DiagonalTopLeftCornerToBottomRightCornerLine = '\\',
	DiagonalBottomLeftCornerToTopRightCornerLine = '/',
	FillCell = '#'
}

export interface AutoGlyphsOptions {
	size?: number;
	margin?: number;
	className?: string;
}

export interface GlyphConstructSizes {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export type GlyphContructionElement = [command: string, sizes: GlyphConstructSizes];

export function generateOperations(
	instructions: string,
	options?: AutoGlyphsOptions
): [operations: readonly GlyphContructionElement[], cellsize: number] {
	const size = options?.size || 1000;
	const cellsize = size / 64;

	let x = 0;
	let y = 0;
	const elements: GlyphContructionElement[] = [];

	for (const c of instructions) {
		if (c === GlyphDrawInstruction.CenteredHorizontalLine || c === GlyphDrawInstruction.VerticalAndHorizontalLine)
			elements.push([
				'line',
				{
					x1: x * cellsize,
					y1: y * cellsize + cellsize / 2,
					x2: (x + 1) * cellsize,
					y2: y * cellsize + cellsize / 2
				}
			]);

		if (c === GlyphDrawInstruction.CenteredVerticalLine || c === GlyphDrawInstruction.VerticalAndHorizontalLine)
			elements.push([
				'line',
				{
					x1: x * cellsize + cellsize / 2,
					y1: y * cellsize,
					x2: x * cellsize + cellsize / 2,
					y2: (y + 1) * cellsize
				}
			]);

		x++;
		if (x === 64) {
			x = 0;
			y++;
		}
	}

	return [elements, cellsize];
}

export function asSVG(instructions: string, options?: AutoGlyphsOptions) {
	const fullSize = options?.size || 800;
	const contentSize: number = options?.margin ? fullSize - options?.margin * 2 : fullSize;

	const [operations, cellsize] = generateOperations(instructions, { size: contentSize });

	const elements: string[] = [];
	for (const [command, args] of operations) {
		const attributeStr = Object.entries(args)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ');
		elements.push(`<${command} ${attributeStr} />`);
	}

	let svgCode = `${elements.join('\n')}`;
	if (options?.margin) {
		svgCode = `<g transform="translate(${options?.margin} ${options?.margin})">${svgCode}</g>`;
	}

	svgCode = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${fullSize} ${fullSize}" className="${
		options?.className ?? ''
	}" data-cellsize="${cellsize}">${svgCode}</svg>`;

	svgCode = `data:image/svg+xml;utf8,${svgCode}`;

	return svgCode;
}
