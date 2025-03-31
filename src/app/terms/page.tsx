import { getMdContent } from "@/lib";
import ReactMarkdown from "react-markdown";

export default async function TermsPage() {
  const content = await getMdContent("terms");
  return (
    <section className="container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}
