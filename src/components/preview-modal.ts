import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { PreviewClick } from '../utils/models.ts';
import { ShadowedElement } from "./shadowed-element.ts";

@customElement("preview-modal")
class PreviewModal extends ShadowedElement {
	static styles = css`
		:host {
			display: none;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.9);
			z-index: 1000;
        }

		.image {
			max-width: 90%;
			max-height: 90%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		button {
			position: absolute;
			top: 20px;
			right: 30px;
			color: white;
			font-size: 30px;
			cursor: pointer;
			background: none;
			border: none;
		}
	`;

	close() {
		this.style.display = "none";
	}

	show(src: string) {
		let img = this.query("img");
		if (!img) {
			return;
		}

		img.src = src;
		this.style.display = 'block';
	}

	render() {
		return html`
			<img class="image" src="" alt="Preview">
	        <button class="preview" @click=${() => this.close()}>&times;</button>
		`;
	}
}

declare global {
  interface HTMLElementTagNameMap {
    "preview-modal": PreviewModal;
  }
}

function onPreview({ src }: PreviewClick) {
	const preview = document.querySelector("preview-modal");
	preview?.show(src);
}

window.onload = () => {
	const body = document.querySelector("body");
	body?.addEventListener(PreviewClick.NAME, onPreview as EventListener);
}
