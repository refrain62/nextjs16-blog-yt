import { cacheLife } from "next/cache";
import Link from "next/link"
import { Suspense } from "react";

interface Post {
  title: string;
  body: string;
}

const japaneseConotext = [
  {
    title: "Next.js 16の新機能",
    body: "Next.js 16では、パフォーマンスの向上と新しいキャッシュ機能が導入されました。",
  },
  {
    title: "TypeScriptでの型安全な開発",
    body: "TypeScriptを使用することで、コードの品質と保守性が向上します。",
  },
  {
    title: "Tailwind CSSの活用方法",
    body: "Tailwind CSSを使って効率的にスタイリングを行う方法を紹介します。",
  },
  {
    title: "パフォーマンス最適化のベストプラクティス",
    body: "ウェブアプリケーションのパフォーマンスを最適化するためのベストプラクティスを解説します。",
  },
];


async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("days");
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts;
}

async function PostsList() {
  const posts = await getPosts();

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <Link
          key={post.title}
          href={`/posts/${post.title}`}
          className="group block rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <article>
            <h2 className="mb-3 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
              {post.title}
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {post.body}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-zinc-600">
              記事を読む
              <svg
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </article>
        </Link>
      ))}
    </div>
  );
}


export default function PostsPages() {
  return (
    <div className="min-h-screen bg-white dardk;bg-zinc-9050">
      <div className="mx-auto max-w-3x1 px-6 py-24">
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-600">
            ブログ
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            考え、アイデア、そして物語
          </p>
        </header>

        {/* <Suspense 
          fallback={
            <div className="space-y-12">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="animate-pulse border-b border-zinc-200 pb-12 dark:border-zinc-800">
                  <div className="mb-3 h-8 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          }
        > */}
          <PostsList />
        {/* </Suspense> */}
      </div>
    </div>
  )
}