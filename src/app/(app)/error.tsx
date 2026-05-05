"use client";

/**
 * Delegates to the root segment error boundary so recovery behavior and copy stay
 * consistent across the tree (`unstable_retry`, digest logging).
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export { default } from "@/app/error";
