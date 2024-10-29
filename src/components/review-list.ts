import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { Review } from "../utils/models.ts";
import { markdown } from "../utils/md.ts";
import { DataElement } from "./data-element.ts";

import "./review-note.ts";

@customElement("review-list")
class ReviewList extends DataElement<Review> {
	static styles = css`
		:host {
            margin-top: 2rem;
			display: block;
			width: 100%;
			display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
		}

		a {
			color: var(--accent-color);
		}

		review-note {
            transition: transform 0.3s ease;
		}

		review-note:hover {
            transform: translateY(-5px);
		}
	`;

	render() {
		return repeat(this.data,
			({ name, stars, review }) => html`
			<review-note name=${name} stars=${stars}>
				${markdown(review)}
			</review-note>
		`);
	}
}
