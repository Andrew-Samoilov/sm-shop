import { getMdContent } from "@/lib";
import ReactMarkdown from "react-markdown";

export default async function WarrantyPage() {
  const content = await getMdContent("warranty");
  return (
    <section className="">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}
