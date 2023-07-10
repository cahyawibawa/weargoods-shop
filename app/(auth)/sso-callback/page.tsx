import type { HandleOAuthCallbackParams } from "@clerk/types";

import SSOCallback from "@/components/auth/sso-callback";
import { Shell } from "@/components/Shell";

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams;
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <Shell className="max-w-xs">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  );
}
