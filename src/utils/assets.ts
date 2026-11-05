/**
 * Utility to resolve asset URLs relative to the application base path.
 * Ensures compatibility with GitHub Pages (sub-path deployments), custom domains,
 * and standard root deployments.
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Remove leading slash to prevent root domain resolution on GitHub Pages
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || './';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${prefix}${cleanPath}`;
}
