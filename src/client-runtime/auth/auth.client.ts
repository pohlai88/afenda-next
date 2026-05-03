"use client";

/**
 * @afenda-owner client-runtime
 * @afenda-subject auth
 * @afenda-artifact adapter
 * @afenda-boundary client
 * @afenda-description Client adapter for Better Auth browser sessions
 */
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;
