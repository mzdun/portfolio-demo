import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from 'lit/directives/class-map.js';
import { Question } from "../utils/models.ts";
import { markdown } from "../utils/md.ts";
import { DataElement } from "./data-element.ts";

import "./work-item.ts";

@customElement("faq-question")
class SingleQuestion extends LitElement {
	static styles = css`
		.question {
			border: 1px solid var(--border-color);
			border-radius: 9px;
			margin-bottom: 1rem;
		}

		.header {
			background-color: rgb(19, 19, 19);
			padding: 1rem;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;		
		}

		.content {
			padding: 1rem;
			display: none;
		}

		.button {
			font: var(--fa-font-solid);
		}
		.button:before {
			content: '\\f078'
		}


		.opened .content {
			display: block;
		}

		.opened .button:before {
			content: '\\f077'
		}
`;

	static properties = {
		question: { type: String },
		answer: { type: String }
	};

	question: string;
	answer: string;
	opened = false;

	#toggle() {
		this.opened = !this.opened;
		this.requestUpdate();
	}

	render() {
		const { question, answer, opened } = this;
		return html`
				<div class=${classMap({ question: true, opened })}>
					<div class="header" @click=${() => this.#toggle()}>
						<h3>${question}</h3>
						<span class="button"></span>
					</div>
					<div class="content">
						${markdown(answer)}
					</div>
				</div>
			`;
	}
}

@customElement("faq-accordion")
class FAQAccordion extends DataElement<Question> {
	render() {
		return repeat(
			this.data,
			({ question, answer }) => html`
				<faq-question question=${question} answer=${answer}></faq-question>
			`
		);
	}
}

