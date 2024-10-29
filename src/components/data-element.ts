import { PropertyValues } from "lit";
import { ShadowedElement } from "./shadowed-element";
import { loadInfo } from "../utils/fetch";
import { applyAppBase } from "../utils/vite";

export class DataElement<DataType> extends ShadowedElement {
	static properties = {
		src: { type: String }
	};

	src: string;

	data: DataType[] = [];
	#base: URL = new URL(window.location.toString());

	update(changedProperties: PropertyValues) {
		super.update(changedProperties);

		if (changedProperties.has('src')) {
			this.#fetchData(this.src);
		}
	}

	async #fetchData(src: string | undefined) {
		if (src) {
			this.#base = new URL(applyAppBase(src), window.location.toString());
		}

		this.data = (await loadInfo<DataType[]>(this.#base.pathname)) ?? [];
		this.dataUpdated(this.data);
		this.requestUpdate();
	}

	protected dataUpdated(data: DataType[]) { }

	makeHref(url: string): string;
	makeHref(url: string | undefined): string | undefined;
	makeHref(url: string | undefined) {
		if (url === undefined) {
			return undefined;
		}
		return new URL(applyAppBase(url), this.#base).pathname;
	}
}
