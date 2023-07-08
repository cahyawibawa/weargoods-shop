import { ErrorCard } from "@/components/ErrorCard";
import { Shell } from "@/components/Shell";

export default function PageNotFound() {
  return (
    <Shell variant="centered">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  );
}
