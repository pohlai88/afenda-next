import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { getAuth } from "./auth.server";

export const getSession = cache(async () =>
  getAuth().api.getSession({ headers: await headers() }),
);
