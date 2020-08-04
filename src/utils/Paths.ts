/**
 * Joins multiple paths
 * @param parts
 */
export function joinPaths(...parts: string[]) {
	let allParts: string[] = [];

	parts.forEach((part: string) => {
		allParts = allParts.concat(part.split('/').filter((s: string) => s !== ''));
	});

	return `${allParts.join('/')}`;
}
