export interface NavItem {
	label: string;
	name: string;
	href?: string;
	onlySplit?: boolean;
}

export function hrefFromNav({name, href}: NavItem) {
	return href ?? `/pages/${name}/`
}

const navItem = (label: string, name: string, href?: string) => ({ label, name, href });
const splitNavItem = (label: string, name: string, href?: string) => ({ label, name, href, onlySplit: true });
export const nav: NavItem[] = [
	navItem("Home", "home", "/"),
	navItem("About", "about"),
	navItem("Works", "works"),
	splitNavItem("Video", "video"),
	splitNavItem("FAQ", "faq"),
	navItem("Contact", "contact"),
]
