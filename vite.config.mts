import { UserConfig, defineConfig, resolveConfig } from "vite";
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

function getBase() {
	const args = process.argv.slice(3);
	const argIndex = args.findIndex((value) => value == "--base" || value.startsWith("--base="))
	if (argIndex < 0) {
		return "/";
	}
	if (args[argIndex] === "--base") {
		return args[argIndex + 1] || '/';
	}

	const arg = args[argIndex].substring("--base=".length);
	return arg || "/";
}

const stripSlash = (base: string) => base.endsWith('/') ? base.substring(0, base.length - 1) : base;

const appRootBase = stripSlash(getBase());
const appRoot = JSON.stringify(appRootBase);

if (appRootBase.length > 0) {
	console.log("Building application inside", appRootBase);
}

export default {
	define: { appRoot },
	build: {
		rollupOptions: { input },
	},
} satisfies UserConfig;
