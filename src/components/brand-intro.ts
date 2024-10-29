import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("brand-intro")
class BrandIntro extends LitElement {
	static styles = css`
		:host {
            position: relative;
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
			background-image: url('/images/hero-image.jpg')
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

