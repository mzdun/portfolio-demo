import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { MediaFile } from "../utils/models.ts";
import { DataElement } from "./data-element.ts";

import "./work-item.ts";

@customElement("video-carousel")
class VideoCarousel extends DataElement<MediaFile> {
	static styles = css`
		:host {
            position: relative;
		}
		.container {
            display: flex;
            overflow-x: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 1rem;
			padding-bottom: 1rem;
        }
        .item {
            flex: 0 0 100%;
            scroll-snap-align: start;
        }
        video {
            width: 100%;
            border-radius: 15px;
        }
        button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: var(--button-bg-color);
            color: var(--text-color);
            border: none;
            font-size: 2rem;
            padding: 1rem;
            cursor: pointer;
            z-index: 10;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: var(--button-hover-color);
        }
        button.prev {
            left: 1rem;
        }
        button.next {
            right: 1rem;
        }

		.dots {
			position: absolute;
			display: flex;
			gap: .5rem;
			left: 50%;
			bottom: 0;
			transform: translate(-50%, 0)
		}

		.dot {
			display: inline-block;
			width: .5rem;
			height: .5rem;
			background-color: var(--text-color);
			border-radius: .25rem;
			opacity: .5;
			transition-property: opacity, width;
			transition-duration: 300ms;
			transition-timing-function: ease-in;
		}
		.dot.sel {
			width: 1rem;
			opacity: 1;
		}
	`;

	currentVideo = 0;

	dataUpdated(data: MediaFile[]) {
		data.forEach((file) => file.sources.forEach((source) => source.src = this.makeHref(source.src)));
	}

	#renderVideos() {
		return repeat(
			this.data,
			(file) => html`
				<div class="item">
					<video controls poster=${ifDefined(file.poster)}>
						${repeat(
							file.sources,
							({src, type}) => html`<source src=${src} type=${type}>`
						)}
					</video>
				</div>
			`
		);
	}

	#scroll(direction: 1 | -1) {
		this.currentVideo = Math.max(Math.min(this.currentVideo + direction, this.data.length - 1), 0);
		this.requestUpdate();

		const container = this.query<HTMLElement>(".container");
		if (container === null) {
			return;
		}
		container.scrollBy({ left: container.offsetWidth * direction, behavior: 'smooth' });
	}

	render() {
		return html`
		<div class="container">
			${this.#renderVideos()}
			<div class="dots">
				${repeat(
					Array(this.data.length),
					(_, index) => html`<div class="dot${index === this.currentVideo ? " sel" : ""}"></div>`
				)}
			</div>
			<button class="prev" @click=${() => this.#scroll(-1)}>&lt;</button>
			<button class="next" @click=${() => this.#scroll(1)}>&gt;</button>
		</div>
		`
	}
}

