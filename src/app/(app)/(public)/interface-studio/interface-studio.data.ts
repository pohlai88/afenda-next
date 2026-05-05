/**
 * @afenda-owner interface-studio
 * @afenda-subject data
 * @afenda-boundary interface-studio
 * @afenda-description Memoized registry reads so generateMetadata and the page share one lookup (Next.js guidance).
 */
import { cache } from "react";

import { getInterfaceStudioItem } from "./interface-studio.preview";
import type { InterfaceStudioSection } from "./interface-studio.types";

export const getCachedInterfaceStudioItem = cache(
  (section: InterfaceStudioSection, slug: string) => getInterfaceStudioItem(section, slug),
);
