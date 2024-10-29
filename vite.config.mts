import { UserConfig } from "vite";
import { resolve } from 'path';
import { existsSync } from 'fs';
import { hrefFromNav, nav } from './src/utils/nav';

function hrefToPath([name, href]: [string, string]): [string, string] {
	return [name, resolve(__dirname, `${href.substring(1)}index.html`)];
}

function inputExists([_, path]: [string, string]) {
	return existsSync(path);
}

const navInputs = Object.fromEntries(nav
	.map((item): [string, string] => [item.name, hrefFromNav(item)])
	.map(hrefToPath)
	.filter(inputExists)
);

const projectInputs = Object.fromEntries([...Array(3).keys()]
	.map(key => `project${key + 1}`)
	.map((name): [string, string] => [name, `/projects/${name}/`])
	.map(hrefToPath)
	.filter(inputExists));

const input = { ...navInputs, ...projectInputs, standalone: hrefToPath(['', '/standalone/'])[1] };

export default {
	build: {
		rollupOptions: { input },
	},
} satisfies UserConfig;
