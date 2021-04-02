export enum Defaults {
	Clear = 'background: none; color: unset;'
}

export const ActiveStatus = (active: boolean) => {
	console.log(
		`%cWallet connection%c %c=%c %c${active ? 'active' : 'inactive'}`,
		'background-color: #f6851b; border-radius: 5px; padding: 3px; color: #161616;',
		Defaults.Clear,
		'background-color: #f6851b; border-radius: 5px; padding: 3px; color: #161616;',
		Defaults.Clear,
		`background: none; color: ${active ? '#4feb34' : '#e80e0e'};`
	);
};
