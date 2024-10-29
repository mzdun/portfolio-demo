import { parse as yamlParse } from 'yaml';

export function safeYaml<T>(text: string) {
	try {
		return yamlParse(text) as T;
	} catch (e) {
		return undefined;
	}
}

export function safeJson<T>(text: string) {
	try {
		return JSON.parse(text) as T;
	} catch (e) {
		return undefined;
	}
}

export async function loadInfo<T>(url: string | undefined) {
	if (url === undefined) {
		return undefined;
	}

	try {
		const request = await fetch(url);
		if (request.status > 399) {
			return undefined;
		}

		const text = await request.text();
		if (url.endsWith(".yaml") || url.endsWith(".yml"))
			return safeYaml<T>(text);
		return safeJson<T>(text);
	} catch (e) {
		return undefined;
	}
}
