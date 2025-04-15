import { getMdContent } from "@/lib";
import ReactMarkdown from "react-markdown";

export default async function LegalPage() {
  const content = await getMdContent("legal");
  return (
    <section className="container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}
