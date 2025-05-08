import { getMdContent } from "@/lib";
import ReactMarkdown from "react-markdown";

export default async function LegalPage() {
  const content = await getMdContent("legal");
  return (
    <section className="lg:max-w-[70ch]">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}
