/**
 * Segment `not-found` for `notFound()` calls under `(app)/*`. Reuses the root
 * surface so operators see one consistent 404 experience.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export { default, metadata } from "@/app/not-found";
