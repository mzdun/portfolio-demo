import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { PreviewClick } from "../utils/models.ts";

import "./link-button.ts";

@customElement("work-item")
class WorkItem extends LitElement {
	static styles = css`
		:host {
			display: block;
			border: 1px solid var(--border-color);
			border-radius: 15px;
			overflow: hidden;
        }

		.image {
			height: 200px;
			background-size: cover;
			background-position: center;
		}

		.text {
			padding: 1rem;
		}

		.buttons {
			display: flex;
			justify-content: space-between;
		}
	`;

	static properties = {
		title: { type: String },
		description: { type: String },
		image: { type: String },
		preview: { type: String },
		link: { type: String },
	};

	title: string;
	description: string;
	image: string;
	preview: string;
	link: string;

	#sendPreview(src: string) {
		this.dispatchEvent(new PreviewClick(src));
	}

	render() {
		const { title, description, image, preview, link } = this;
		const img = image ?? preview;

		return html`
			<div class="image" style="background-image: url(${img})"></div>
			<div class="text">
				<h3>${title}</h3>
				<p>${description}</p>
				<div class="buttons">
					${preview === undefined ? html`<span></span>` : html`
						<link-button @click=${() => this.#sendPreview(preview)}>Preview</link-button>
					`}
					${link === undefined ? html`<span></span>` : html`
						<link-button href=${link}>Go to page</link-button>
					`}
				</div>
			</div>
		`;
	}
}

