/**
 * @afenda-owner interface-lab
 * @afenda-subject static-params
 * @afenda-boundary server
 * @afenda-description Shared generateStaticParams payload for components segment routes.
 */
import { getInterfaceLabItems } from "./interface-lab.preview";

export function getInterfaceLabComponentSlugParams(): Array<{ slug: string }> {
  return getInterfaceLabItems("components").map((item) => ({ slug: item.slug }));
}
