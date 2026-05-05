/**
 * @afenda-owner declaration-shell
 * @afenda-subject ui-blocks
 * @afenda-artifact types
 * @afenda-boundary shared
 * @afenda-description Structural types for public declaration routes and footer declarations.
 */

export type DeclarationSection = {
  readonly id: string;
  readonly title: string;
  readonly body: readonly string[];
  readonly bullets?: readonly string[];
};

export type DeclarationRelatedLink = {
  readonly href: `/${string}`;
  readonly label: string;
  readonly description: string;
};

export type DeclarationContactChannel = {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly href?: string;
};

export type DeclarationLegalIdentity = {
  readonly legalEntityName: string;
  readonly companyRegistrationNumber: string;
  readonly incorporationStatement: string;
  readonly regionalStatement: string;
  readonly privacyInquiryLabel: string;
  readonly privacyInquiryEmail: string;
};

export type DeclarationDocumentDefinition = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly summary: string;
  readonly sections: readonly DeclarationSection[];
  readonly relatedLinks: readonly DeclarationRelatedLink[];
  readonly contactChannels: readonly DeclarationContactChannel[];
  readonly statusNote?: string;
  readonly lastUpdatedLabel?: string;
};

export type DeclarationShellProps = {
  readonly document: DeclarationDocumentDefinition;
  readonly footerLinks: readonly DeclarationRelatedLink[];
  readonly legalIdentity: DeclarationLegalIdentity;
};
