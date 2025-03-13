import { getMdContent } from '@/lib';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function Page() {
    const content = await getMdContent('terms');
    return (
        <section className="container">
            <h1
                className='pb-6 '>
                Умови користування сайтом
            </h1>

          <ReactMarkdown>
                {content}
            </ReactMarkdown>

            <Link
                href="/"
                className="btn md:btn-lg btn-primary mr-auto hover:no-underline"
            >
                Закрити
            </Link>
        </section>
    );
};
