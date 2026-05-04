/**
 * @afenda-owner interface-lab
 * @afenda-subject data
 * @afenda-boundary interface-lab
 * @afenda-description Memoized registry reads so generateMetadata and the page share one lookup (Next.js guidance).
 */
import { cache } from "react";

import { getInterfaceLabItem } from "./interface-lab.preview";
import type { InterfaceLabSection } from "./interface-lab.types";

export const getCachedInterfaceLabItem = cache(
  (section: InterfaceLabSection, slug: string) => getInterfaceLabItem(section, slug),
);
