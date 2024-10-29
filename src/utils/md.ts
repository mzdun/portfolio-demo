import markdownit from 'markdown-it';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const md = markdownit({});

export function markdown(text: string) {
	return unsafeHTML(md.render(text));
}
