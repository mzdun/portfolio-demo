import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { PinnedWork } from "../utils/models.ts";
import { DataElement } from "./data-element.ts";

import "./work-item.ts";

@customElement("work-list")
class WorkList extends DataElement<PinnedWork> {
	static styles = css`
		:host {
            display: grid;
    		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    		gap: 2rem;
		}

		work-item {
            transition: transform 0.3s ease;
		}

		work-item:hover {
            transform: translateY(-5px);
		}
	`;

	dataUpdated(data: PinnedWork[]) {
		data.forEach((work) => {
			work.image = this.makeHref(work.image);
			work.preview = this.makeHref(work.preview);
			work.link = this.makeHref(work.link);
		});
	}

	render() {
		return repeat(
			this.data,
			({ title, description, image, preview, link }: PinnedWork) => html`
				<work-item
					title=${title}
					description=${description}
					image=${ifDefined(image)}
					preview=${ifDefined(preview)}
					link=${ifDefined(link)}
				></work-item>
			`
		);
	}
}

