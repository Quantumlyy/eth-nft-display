import Link from 'next/link';
import React from 'react';

export interface NavbarLinkProps {
	className: string;
	href: string;
	content: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ content, href, className }) => {
	return (
		<Link href={href}>
			<span className={className}>{content}</span>
		</Link>
	);
};

export default NavbarLink;
