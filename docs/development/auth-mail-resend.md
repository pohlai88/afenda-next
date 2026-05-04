# Auth mail with Better Auth and Resend

Afenda uses Better Auth for auth flows and Resend as the transport for auth
mail. This slice is intentionally narrow. It covers only:

- email verification
- magic link sign-in
- email OTP sign-in
- email OTP verification
- password reset mail
- operator invite mail

It does not define a generic notification system.

## Required env contract

Runtime auth mail is driven by:

```dotenv
BETTER_AUTH_URL=http://localhost:3000
RESEND_API_KEY=re_xxx
AUTH_FROM_EMAIL=no-reply@nexuscanon.com
AUTH_REPLY_TO_EMAIL=support@nexuscanon.com
```

Notes:

- `AUTH_REPLY_TO_EMAIL` is optional.
- `AUTH_FROM_EMAIL` is the visible sender address used by auth mail.
- `BETTER_AUTH_URL` remains the canonical auth origin for callbacks and links.
- `DEFAULT_FROM_EMAIL` and `DEFAULT_FROM_NAME` are not used by Better Auth
  mail delivery.

Local development is managed through [`C:\JackProject\afenda-next\.env.config`](C:\JackProject\afenda-next\.env.config)
and synced into `.env.local` with `pnpm env:sync`.

## Resend setup

Resend does not require a pre-created sender identity for every address. Once
the sending domain is verified, Afenda can send from any address on that
domain.

Recommended sender addresses:

- `AUTH_FROM_EMAIL=no-reply@nexuscanon.com`
- `AUTH_REPLY_TO_EMAIL=support@nexuscanon.com`

Operational steps:

1. Add `nexuscanon.com` or a dedicated sending subdomain in Resend.
2. Complete the DNS verification records in your DNS provider.
3. Confirm the domain is verified in Resend.
4. Create a Resend API key and set `RESEND_API_KEY`.
5. Mirror the same env contract in local development and Vercel production.

## Expected auth flows

- Public sign-up/sign-in:
  - OAuth
  - magic link
  - email OTP
  - password fallback
- Verified-email upgrade:
  - verification email resend
- Elevated onboarding:
  - operator/admin invite email

All of these flows send through the same server-only Resend adapter.

## Common failure modes

- Missing `RESEND_API_KEY`
  - the app cannot attempt delivery
- Missing `AUTH_FROM_EMAIL`
  - the app cannot build a sender identity
- Unverified sending domain in Resend
  - Resend rejects delivery attempts
- Incorrect `BETTER_AUTH_URL`
  - links point at the wrong origin or callback path
- Production env drift
  - local works, deployed auth mail does not

## Official references

- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
- [Resend sender behavior](https://resend.com/docs/knowledge-base/how-do-I-create-an-email-address-or-sender-in-resend)
- [Resend email send API](https://resend.com/docs/api-reference/emails)
- [Better Auth Magic Link](https://better-auth.com/docs/plugins/magic-link)
- [Better Auth Email OTP](https://better-auth.com/docs/plugins/email-otp)
