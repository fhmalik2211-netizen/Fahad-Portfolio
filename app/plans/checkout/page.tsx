import CheckoutClient from "./CheckoutClient";

export default async function PlanCheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ plan?: string }> | { plan?: string };
}) {
  const resolvedParams = searchParams ? await Promise.resolve(searchParams) : {};

  return <CheckoutClient planName={resolvedParams.plan} />;
}
