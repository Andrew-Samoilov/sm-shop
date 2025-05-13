import { getContentBlock } from "@/lib";
import { Block } from "@/types";
import ReactMarkdown from "react-markdown";

export default async function WarrantyPage() {
  // const content = await getMdContent("warranty");
  const content = await getContentBlock<Block>('warranty', { markdown: '' });
  
  return (
    <section className="lg:max-w-[70ch]">
      <ReactMarkdown>{content.markdown}</ReactMarkdown>
    </section>
  );
}
