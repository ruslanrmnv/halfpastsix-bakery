import type { Metadata } from "next";
import OrderFlow from "@/components/OrderFlow";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Order — ${site.name}`,
  description: `Reserve today's bread for pickup. Two fields, no account, pay at the counter — ${site.address.street}, ${site.address.city}.`,
};

export default function OrderPage() {
  return (
    <div className="wrap">
      <SiteHeader current="/order/" />
      <OrderFlow />
    </div>
  );
}
