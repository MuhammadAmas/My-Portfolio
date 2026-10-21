import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import ArticleBody from "../components/ArticleBody";
import { articles, getArticle } from "../data/articles/index.js";
import { formatArticleDate } from "../lib/articles";
import { trackExternalLink, trackPublicationView } from "../lib/analytics";

const bodies = import.meta.glob(["../data/articles/*.js", "!../data/articles/index.js"]);

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);
  const [body, setBody] = useState({ slug: null, html: null, failed: false });

  useEffect(() => {
    if (!article) return undefined;
    let cancelled = false;
    const load = bodies[`../data/articles/${article.slug}.js`];
    load()
      .then((module) => !cancelled && setBody({ slug: article.slug, html: module.default, failed: false }))
      .catch(() => !cancelled && setBody({ slug: article.slug, html: null, failed: true }));
    trackPublicationView(article.title);
    return () => {
      cancelled = true;
    };
  }, [article]);

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">Article not found</h1>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          This link may be out of date. Every article is listed on the Publications page.
        </p>
        <Button asChild>
          <Link to="/publications">Browse articles</Link>
        </Button>
      </div>
    );
  }

  const ready = body.slug === article.slug;
  const more = articles.filter(({ slug: other }) => other !== article.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl py-8 text-neutral-900 dark:text-neutral-100 md:py-16">
      <Link
        to="/publications"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles
      </Link>

      <header className="border-b border-neutral-200 pb-8 pt-6 dark:border-neutral-800 md:pb-10">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
          Article
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {article.readTime}
          </span>
          <a
            href={article.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-black dark:hover:text-white"
            onClick={() => trackExternalLink(article.mediumUrl, `${article.title} on Medium`)}
          >
            Originally published on Medium <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="pt-10" aria-busy={!ready}>
        {ready && body.html && <ArticleBody html={body.html} />}
        {ready && body.failed && (
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            This article couldn’t load. Check your connection and refresh, or{" "}
            <a href={article.mediumUrl} className="underline underline-offset-4">
              read it on Medium
            </a>
            .
          </p>
        )}
        {!ready && (
          <div className="space-y-4" aria-hidden="true">
            {[100, 92, 96, 70].map((width) => (
              <div
                key={width}
                className="h-5 rounded bg-neutral-200 dark:bg-neutral-800"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        )}
      </div>

      <aside className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800" aria-labelledby="more-articles">
        <h2 id="more-articles" className="mb-6 text-2xl font-semibold tracking-tight">
          More articles
        </h2>
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {more.map((other) => (
            <li key={other.slug}>
              <Link
                to={`/publications/${other.slug}`}
                className="group flex items-baseline justify-between gap-6 py-4"
              >
                <span className="font-medium group-hover:underline group-hover:underline-offset-4">{other.title}</span>
                <span className="shrink-0 text-sm text-neutral-600 dark:text-neutral-400">
                  {formatArticleDate(other.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/publications">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> All articles
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">
              Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </aside>
    </article>
  );
}
