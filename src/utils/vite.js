/**
 * @param {string} src 
 * @returns {string}
 */
export function applyAppBase(src) {
	if (src.startsWith("/")) {
		return `${appRoot}${src}`;
	}
	return src;
}
