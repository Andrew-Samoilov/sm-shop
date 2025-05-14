import { getContentBlock } from "@/lib";
import { Block } from "@/types";
import ReactMarkdown from "react-markdown";

export default async function PaymentDeliveryPage() {
  // const content = await getMdContent("warranty");
  const content = await getContentBlock<Block>('payment_delivery', { markdown: '' });
  
  return (
    <section className="lg:max-w-[70ch]">
      <ReactMarkdown>{content.markdown}</ReactMarkdown>
    </section>
  );
}
