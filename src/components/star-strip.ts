import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("star-strip")
class Stars extends LitElement {
	static styles = css`
		:host {
			color: #ffd700;
			display: block;
		}
		.fas {
			font: var(--fa-font-solid);
		}
		.far {
			font: var(--fa-font-regular);
		}
		.fa-star:before {
			content: '\\f005'
		}
		.fa-star-half-alt:before {
			content: '\\f5c0'
		}
	`;

	static properties = {
		stars: { type: Number }
	};

	stars: number;

	constructor() {
		super();
		this.stars = 0;
	}

	render() {
		const allStars = 5;
		const starHalves: number = Math.min(Math.floor((this.stars ?? 0) * 2), allStars*2);
		const hasHalfStar = starHalves % 2 == 1;
		const stars = (hasHalfStar ? starHalves - 1 : starHalves) / 2;
		const halfStarIndex = hasHalfStar ? stars : allStars;

		const classFor = (i: number) => i < stars
			? 'fas fa-star'
			: i === halfStarIndex
				? 'fas fa-star-half-alt'
				: 'far fa-star';

		return repeat(
			Array(allStars).keys(),
			(index) => html`
				<i class=${classFor(index)}></i>
			`
		);
	}
}

