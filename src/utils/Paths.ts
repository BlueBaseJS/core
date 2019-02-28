/**
 * Joins multiple paths
 * @param parts
 */
export function joinPaths(...parts: string[]) {
	let allParts: string[] = [];

	parts.forEach(part => {
		allParts = allParts.concat(part.split('/').filter(s => s !== ''));
	});

	return `${allParts.join('/')}`;
}
