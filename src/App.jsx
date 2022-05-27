/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkToc from 'remark-toc';
import remarkSlug from 'remark-slug';
import remarkGfm from 'remark-gfm';

import './markdown.css';
import { content } from './content';

function App() {
	const [showTop, setShowTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			setShowTop(scrollTop > 100);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className='w-screen h-fit bg-zinc-900'>
			<button
				className={`w-12 h-12 z-20 grid place-items-center rounded-full fixed right-8 bottom-8 bg-zinc-900 border-2 border-zinc-100/25 text-zinc-100  ${
					showTop ? 'opacity-75 hover:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none transition-all'
				}`}
				onClick={() => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
			>
				Top
			</button>
			<div className='max-w-screen-md lg:max-w-screen-lg h-fit min-h-screen bg-zinc-800 text-zinc-100 mx-auto py-4 px-8 border-x-2 border-zinc-100/25 drop-shadow-lg'>
				<h1 className='text-4xl font-bold text-center'>Moe-li guide</h1>
				{/* Alert */}
				<div className='w-full h-fit p-2 rounded bg-red-500 my-4'>
					<h4 className='font-bold text-2xl text-center'>Disclaimer</h4>
					<p>
						I'm not a native english speaker, and not too proud with my english grammar. If you found any grammar mistake or anything, you
						can point it out on github issues or don't.
					</p>
				</div>

				<hr className='my-4' />

				<div className='markdown-body px-4 py-2 my-8 rounded-lg'>
					<ReactMarkdown remarkPlugins={[remarkSlug, remarkGfm, remarkBreaks, remarkToc]} rehypePlugins={[rehypeRaw]} children={content} />
				</div>
			</div>
			<div className='w-full h-6 fixed bottom-0 text-center bg-zinc-800'>
				<a href='https://www.github.com/mbaharip/moe-guide' target='_blank' rel='noopener noreferrer' className='external'>
					Github repositories
				</a>
			</div>
		</div>
	);
}

export default App;
