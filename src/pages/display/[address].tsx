import Assets from 'components/Account/Assets';
import Offset from 'components/Navbar/Offset';
import useConnectionActive from 'hooks/useConnectionActive';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const AssetsDisplay: NextPage = () => {
	const router = useRouter();
	const isConnected = useConnectionActive();

	return (
		<div>
			<Offset />
			{isConnected ? (
				<>
					<h1>Hello</h1>
					<Assets address={Array.isArray(router.query.address) ? router.query.address[0] : router.query.address} />
				</>
			) : null}
		</div>
	);
};

export default AssetsDisplay;
