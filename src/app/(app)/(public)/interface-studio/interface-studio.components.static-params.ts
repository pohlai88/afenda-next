/**
 * @afenda-owner interface-studio
 * @afenda-subject static-params
 * @afenda-boundary server
 * @afenda-description Shared generateStaticParams payload for components segment routes.
 */
import { getInterfaceStudioItems } from "./interface-studio.preview";

export function getInterfaceStudioComponentSlugParams(): Array<{ slug: string }> {
  return getInterfaceStudioItems("components").map((item) => ({ slug: item.slug }));
}
