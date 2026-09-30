// Next substitutes NEXT_PUBLIC_* at build time, including in client components.
export const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/siteadam"
).replace(/\/+$/, "");

export function assetPath(path: `/${string}`) {
  return `${basePath}${path}`;
}
