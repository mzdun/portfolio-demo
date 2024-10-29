import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import styles from './button.css.ts';

@customElement("link-button")
class LinkButton extends LitElement {
	static styles = styles;

	static properties = {
		href: { type: String }
	};

	href: string;

	#onClick() {
		const { href } = this;
		if (href) {
			window.location.href = href;
			return;
		}
		this.dispatchEvent(new CustomEvent("click", {bubbles: true, composed: true}));
	}

	render() {
		return html`<button @click=${() => this.#onClick()}><slot></slot></button>`;
	}
}

