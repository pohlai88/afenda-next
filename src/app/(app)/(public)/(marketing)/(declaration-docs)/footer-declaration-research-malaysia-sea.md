# Footer Declaration Research for a Malaysia-Established Company Serving Southeast Asia

## Scope

This note is for Afenda's public marketing footer and linked declaration pages.

It answers one narrow question:

What should the footer itself declare for a company established in Malaysia and selling to Southeast Asian business customers?

This is product research, not legal advice. Counsel should confirm the final text before launch.

## Bottom line

The footer should not try to carry the whole legal burden.

For a Malaysia-established B2B software company, the footer itself should do three jobs:

1. identify the legal entity clearly;
2. provide the minimum navigation to core legal and trust documents; and
3. expose the right business/privacy contact points for regional buyers and regulators.

## What should be in the footer itself

### Required in the footer

1. Registered legal entity name.
2. Company registration number.
3. Link to `Privacy Notice`.
4. Link to `Terms of Use` or `Terms of Service`.

### Strongly recommended in the footer

1. Registered office or principal business contact link.
2. `Contact` link or business email.
3. `Security` or `Trust` link for enterprise buyers.
4. `Cookie Notice` link if cookies, analytics, ad tech, session replay, or similar tracking are used.
5. Privacy / DPO contact email if the company is processing meaningful customer or prospect data across the region.

### Conditional declarations

1. Former company name, if the company changed its name within the last 12 months.
2. Licensing / regulatory disclosure, if Afenda operates in a regulated sector where licence numbers must be shown.
3. Tax / invoicing identifier, if commercial or invoicing workflows require it.

## What should **not** be forced into the footer

These should exist as linked pages, not as dense footer text:

1. Full privacy notice.
2. Full terms of service.
3. Full cookie policy.
4. Cross-border transfer explanation.
5. Data subject rights procedures.
6. Subprocessor list or security commitments.

## Malaysia legal baseline

### 1. Company identity on the website is not optional

Malaysia's Companies Act 2016 requires a company to disclose its registered name and company registration number on its websites.

Source:

- Companies Act 2016, section 30(2)(b), `(registered name + company registration number on websites)`.
- SSM PDF: <https://www.ssm.com.my/Pages/Legal_Framework/Document/Companies%20Act%202016_Akta%20777_BI%20%281.8.2022%29.pdf>

Relevant extract:

- section 30(2): a company shall disclose its registered name and company registration number on its websites;
- section 30(4): if the company changed its name, the former name must appear beneath the present registered name for at least 12 months.

### 2. Privacy notice is part of the compliance baseline

Malaysia PDPA materials make the privacy notice a first-class compliance document, not an optional help page.

The Personal Data Protection Commissioner's materials point to:

1. a dedicated privacy notice;
2. stated purposes of collection and processing;
3. retention;
4. disclosure;
5. data subject rights; and
6. contact information.

Sources:

- PDPA portal: <https://www.pdp.gov.my/ppdpv1/en/akta/pdp-act-2010-en/>
- JPDP privacy notice page: <https://www.pdp.gov.my/ppdpv1/en/privacy/>
- Quick guide to privacy notice: <https://www.pdp.gov.my/ppdpv1/wp-content/uploads/2025/01/A-Quick-Guide-to-PRIVACY-NOTICE.pdf>

Useful points from the official JPDP privacy notice page:

1. the notice explains types of data collected;
2. it states purposes of processing;
3. it explains retention and disclosure;
4. it explains rights;
5. it includes cookie use; and
6. it exposes a contact address, phone, and email.

### 3. DPO visibility matters more after the 2025 changes

Malaysia's current official FAQ makes DPO obligations more concrete than older PDPA-era guidance.

The official FAQ states that a DPO must be appointed if processing involves:

1. more than 20,000 data subjects;
2. more than 10,000 sensitive / financial data subjects; or
3. regular and systematic monitoring such as online user behaviour tracking.

The same FAQ also says:

1. the DPO's business contact information must be available;
2. a dedicated official business email should be provided for the DPO; and
3. notification/registration of the DPO is required when the criteria are met.

Source:

- JPDP FAQ: <https://www.pdp.gov.my/ppdpv1/en/faq/>

This does **not** mean the full DPO details must be printed in the footer in every case.

It does mean Afenda should be prepared to expose a privacy contact path in the footer, especially if marketing analytics, platform telemetry, or enterprise workflows will cross those thresholds.

## Regional Southeast Asia implications

There is no single ASEAN footer rule.

The safest operating model is:

1. comply with Malaysia's company-identity rule on the footer itself;
2. maintain a real privacy notice with clear purposes, contacts, disclosures, retention, and rights;
3. expose a privacy or DPO contact path publicly; and
4. explain cross-border transfers in the linked privacy notice, not in the copyright line.

### Singapore signal

Singapore PDPC materials require overseas transfers to provide protection comparable to the PDPA. They also stress that individuals should be informed of purposes and may contact the organisation's DPO.

Sources:

- PDPC data protection obligations: <https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations>
- PDPC individuals overview: <https://www.pdpc.gov.sg/overview-of-pdpa/data-protection/individual/individuals-overview>

Practical implication for Afenda:

- the footer should link to a privacy notice that includes cross-border transfer wording and a contact route for privacy questions.

### Philippines signal

Philippine NPC guidance on the right to be informed says the privacy notice should identify the controller, contact details, purposes, recipients, retention period, and data subject rights.

Sources:

- NPC right to be informed: <https://privacy.gov.ph/the-right-to-be-informed/>
- NPC DPO registration guidance: <https://privacy.gov.ph/pips-and-pics/register/>

Practical implication for Afenda:

- the footer should link to a privacy notice that names the company entity and exposes a real privacy contact, not only a generic form.

## GitHub repo research

### 1. What open-source footers usually include

Example:

- `Open-Dev-Society/OpenStock` footer component:
  <https://github.com/Open-Dev-Society/OpenStock/blob/main/components/Footer.tsx>

Observed pattern:

1. brand block;
2. support/resource links;
3. `Terms of Service`;
4. social/contact links; and
5. copyright line.

Takeaway:

This is a normal product footer pattern, but it is **not enough** for a Malaysia-established company unless the registered legal name and company registration number are also disclosed somewhere in the footer.

### 2. What legal-template repos assume exists as linked pages

Example:

- `termsfeed/termsfeed-legal-templates`:
  <https://github.com/termsfeed/termsfeed-legal-templates/blob/main/README.md>

Observed pattern:

1. Privacy Policy;
2. Terms and Conditions;
3. Cookies Policy;
4. Disclaimer;
5. Return / Refund;
6. EULA.

Takeaway:

GitHub legal-template repos reinforce the right architecture:

- keep the footer concise;
- link out to dedicated declaration pages;
- do not compress privacy / terms / cookies into a single sentence.

## Recommended Afenda footer declaration set

### Footer row: legal identity

Recommended structure:

`[Legal entity name] (Company No. [registration number]). Incorporated in Malaysia.`

If applicable:

`Formerly [old legal name]` for 12 months after a name change.

### Footer row: policy links

Recommended minimum links:

1. `Privacy Notice`
2. `Terms of Use`
3. `Security`
4. `Contact`

Recommended conditional links:

1. `Cookie Notice`
2. `Subprocessors`
3. `Data Processing Addendum`
4. `Acceptable Use`

### Footer row: privacy contact

Recommended:

`Privacy enquiries: privacy@[domain]`

If DPO threshold is met:

`Data Protection Officer: dpo@[domain]`

Use a role address, not a personal mailbox.

### Footer row: geographic posture

Recommended:

`Serving businesses across Southeast Asia.`

Do **not** claim blanket compliance with every ASEAN regime in the footer.
That belongs in the privacy notice and contract set, and only after legal review.

## Recommended declaration pages to create under this folder

1. `privacy-notice.md`
2. `terms-of-use.md`
3. `cookie-notice.md` if cookies/tracking exist
4. `security-and-trust.md`
5. `subprocessors.md` if third-party hosting, analytics, email, auth, or support vendors are material

## Recommended first footer copy for Afenda

Use this as a product placeholder, not final legal text:

```text
Afenda [Legal Entity Name] (Company No. [Registration Number]). Incorporated in Malaysia.
Serving businesses across Southeast Asia.
Privacy Notice | Terms of Use | Security | Contact
Privacy enquiries: privacy@[domain]
```

If cookies or tracking are present:

```text
Afenda [Legal Entity Name] (Company No. [Registration Number]). Incorporated in Malaysia.
Serving businesses across Southeast Asia.
Privacy Notice | Terms of Use | Cookie Notice | Security | Contact
Privacy enquiries: privacy@[domain]
```

## Decision for implementation

For Afenda's landing footer, the safest and cleanest approach is:

1. add the legal entity name and registration number directly in the footer;
2. add policy links for privacy and terms at minimum;
3. add a privacy contact role address;
4. keep detailed compliance language in linked declaration pages under `(declaration-docs)`;
5. avoid vague claims like `fully compliant across ASEAN`.

