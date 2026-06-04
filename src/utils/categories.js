/**
 * Normalizes DummyJSON category responses.
 * API may return `{ slug, name, url }[]` or legacy string arrays.
 */
export function normalizeCategories(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    if (typeof item === 'string') {
      return {
        slug: item,
        name: formatCategoryLabel(item),
      };
    }
    return {
      slug: item.slug,
      name: item.name || formatCategoryLabel(item.slug),
    };
  });
}

/** Turns "home-decoration" into "Home decoration" */
export function formatCategoryLabel(slug) {
  if (!slug || typeof slug !== 'string') return '';
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}
