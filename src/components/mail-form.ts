import { html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import emailjs from "@emailjs/browser";
import { ShadowedElement } from "./shadowed-element.ts";

import buttonStyles from './button.css.ts';

emailjs.init("X1CfUwDUuAPdjHTVS");

const formStyles = css`
	form {
		display: grid;
		gap: 1rem;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--text-color);
		border-radius: 5px;
	}

	button {
		justify-self: start;
	}

	.message {
		position: absolute;
		left: 50%;
		top: 50%;
		padding: 1rem;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		border: 1px solid var(--border-color);
		background: #111111D0;
	}
`

@customElement("mail-form")
class MailForm extends ShadowedElement {
	static styles = [buttonStyles, formStyles];

	message: string | undefined;
	timer: ReturnType<typeof setTimeout> | undefined = undefined;

	#showMessage(message: string) {
		if (this.timer !== undefined) {
			clearTimeout(this.timer);
		}
		this.message = message;
		this.timer = setTimeout(() => {
			this.message = undefined;
			this.timer = undefined;
			this.requestUpdate();
		}, 3000);

		this.requestUpdate();
	}

	async #sendForm(event: SubmitEvent) {
		event.preventDefault();
		
		console.dir(this.query("form"));

		const form = this.query("form");
		if (!form) {
			return;
		}

		try {
			await emailjs.sendForm('service_dm76d2d', 'template_0ivejti', form);
			console.log("SUCCESS!");
			this.#showMessage("Message sent successfully!");
		} catch (cause) {
			console.log('FAILED');
			console.error(cause);
			this.#showMessage("Failed to send the message. Please try again.");
		}
	}

	#renderMessage(message: string) {
		return html`<div class="message">${message}</div>`
	}

	render() {
		return html`
			<form @submit=${(e) => this.#sendForm(e)}>
				<input type="text" name="name" placeholder="Twoje Imię" required>
				<input type="email" name="email" placeholder="Twój email" required>
				<textarea name="message" placeholder="Treść wiadomości" rows="5" required></textarea>
				<button type="submit">Wyślij</button>
			</form>
			${this.message === undefined ? nothing : this.#renderMessage(this.message)}
		`;
	}
}

