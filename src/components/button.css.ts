import { css } from "lit";

export default css`
button {
  outline: none;
  border: none;
  display: inline-block;
  background-color: var(--button-bg-color);
  color: var(--text-color);
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: var(--button-hover-color);
}
`
