import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { applyAppBase } from "../utils/vite";

const bgImg = applyAppBase('/images/hero-image.jpg');

@customElement("brand-intro")
class BrandIntro extends LitElement {
	static styles = css`
		:host {
            height: 300px;
            display: flex;
            align-items: center;
		}

		.text {
            position: relative;
            z-index: 1;
            padding: 2rem;
            border-radius: 25px;
        }

		.image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
			background-image: ${unsafeCSS(`url("${bgImg}")`)}
        }
	`;
	render() {
		return html`
			<div class="image" id="agency-image"></div>
            <div class="text">
                <slot></slot>
            </div>
		`;
	}
}

