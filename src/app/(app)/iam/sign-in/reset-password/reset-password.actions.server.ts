"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { getAuth } from "@/server/better-auth/auth.config.adapter.server";

const requestSchema = z.object({
  email: z.string().trim().email(),
});

const resetSchema = z.object({
  newPassword: z.string().trim().min(8).max(128),
  token: z.string().trim().min(1),
});

export async function requestPasswordResetAction(formData: FormData) {
  const body = requestSchema.parse({
    email: formData.get("email"),
  });

  await (getAuth().api as any).requestPasswordReset({
    body: {
      email: body.email,
      redirectTo: "/iam/sign-in/reset-password",
    },
  });

  redirect(
    `/iam/sign-in/reset-password?sent=1&email=${encodeURIComponent(body.email)}` as `/iam/sign-in/reset-password?sent=1&email=${string}`,
  );
}

export async function resetPasswordAction(formData: FormData) {
  const body = resetSchema.parse({
    newPassword: formData.get("newPassword"),
    token: formData.get("token"),
  });

  await (getAuth().api as any).resetPassword({
    body,
  });

  redirect("/iam/sign-in?reset=1");
}
