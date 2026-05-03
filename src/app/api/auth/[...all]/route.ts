import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "@/server/better-auth/auth.server";

const handler = (request: Request) => getAuth().handler(request);

export const { GET, POST } = toNextJsHandler(handler);
