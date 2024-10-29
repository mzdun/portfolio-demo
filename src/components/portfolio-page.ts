import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { hrefFromNav, nav } from "../utils/nav";
import { repeat } from "lit/directives/repeat.js";
import { applyAppBase } from "../utils/vite";
import { classMap } from "lit/directives/class-map.js";

@customElement("portfolio-page")
class PortfolioPage extends LitElement {
	static styles = css`
		.container {
			width: 90%;
			max-width: 1200px;
			margin: 0 auto;
			padding: 2rem 0;
			position: relative;
		}

		.light-effect {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 1000px;
            opacity: 0.5;
            pointer-events: none;
        }

		.section {
            border: 1px solid var(--border-color);
            border-radius: 50px;
            padding: 2rem;
            margin-bottom: 2rem;
            overflow: hidden;
        }

        .pos-relative {
            position: relative;
        }

		nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

		.logo {
            height: 25px;
        }

		nav ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
        }

		nav ul li {
            margin-left: 1rem;
        }

		nav ul li a {
            color: var(--secondary-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }

		nav ul li.here a {
            color: var(--text-color);
        }

		nav ul li a:hover {
            color: var(--accent-color);
        }

        footer {
            text-align: center;
            padding: 2rem 0;
            border-top: 1px solid var(--border-color);
        }
	`;

	static properties = {
		name: { type: String },
		position: { type: String },
	};

	name: string;
	position: string|undefined;

	render() {
		const { name: currentName, position } = this;

		return html`
		<div class="container">
			<img src=${applyAppBase("/images/light.png")} alt="Light effect" class="light-effect">

			<nav class="section">
				<img src=${applyAppBase("/images/logo.png")} alt="WAVES Logo" class="logo">
				<ul>
					${repeat(
						nav,
						({ name }) => name,
						(item) => html`
							<li class=${item.name === currentName ? "here" : ""}><a href=${applyAppBase(hrefFromNav(item))}>${item.label}</a></li>
						`
					)}
				</ul>
			</nav>

			<section class=${classMap({ section: true, [`pos-${position}`]: !!position })} id=${currentName}>
				<slot></slot>
			</section>
		</div>

		<footer>
			<p>&copy; 2024 WAVES Creative Agency. All rights reserved.</p>
		</footer>
	`;
	}
}

