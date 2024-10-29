import { LitElement } from "lit";

export class ShadowedElement extends LitElement {
	query<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
	query<E extends Element = Element>(selectors: string): E | null;
	query<E extends Element = Element>(selectors: string): E | null {
		const result = this.querySelector<E>(selectors);
		if (result !== null) {
			return result;
		}

		return this.shadowRoot?.querySelector(selectors) ?? null;
	}
}
