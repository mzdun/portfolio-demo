import { LitElement, html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";

import "./star-strip.ts";

@customElement("review-note")
class ReviewNote extends LitElement {
	static styles = css`
		:host {
			display: block;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 1.5rem;
            width: calc(33.333% - 2rem);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

		.name {
			font-weight: bold;
			margin-bottom: 0.5rem;
		}

		star-strip {
			margin-bottom: 0.5rem;
		}
	`;

	static properties = {
		name: { type: String },
		stars: { type: Number }
	};

	name: string;
	stars: number;

	render() {
		const { name, stars } = this;

		return html`
			${name === undefined ? nothing : html`<div class="name">${name}</div>`}
			<star-strip stars=${stars ?? 0}></star-strip>
			<slot></slot>
		`;
	}
}

