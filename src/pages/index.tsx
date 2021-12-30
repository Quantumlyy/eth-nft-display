import Assets from 'components/Account/Assets';
import Offset from 'components/Navbar/Offset';
import useConnectionActive from 'hooks/useConnectionActive';
import React from 'react';

export default function Home() {
	const isConnected = useConnectionActive();

	return (
		<div>
			<Offset />
			{isConnected ? (
				<>
					<h1>Hello</h1>
					<Assets />
				</>
			) : null}
		</div>
	);
}
