import { getContentBlock } from "@/lib";
import { Block } from "@/types";
import ReactMarkdown from "react-markdown";

export default async function LegalPage() {
  // const content = await getMdContent("legal");
  const content = await getContentBlock<Block>('legal', { markdown: '' });

  return (
    <section className="lg:max-w-[70ch]">
      <ReactMarkdown>{content.markdown}</ReactMarkdown>
    </section>
  );
}
