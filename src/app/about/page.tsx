import { getMdContent } from '@/lib';
import ReactMarkdown from 'react-markdown';

export default async function AboutPage() {
    const content = await getMdContent('about');
    return (
        <section className="container">
            <h1>Про нас</h1>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </section>
    );
};
