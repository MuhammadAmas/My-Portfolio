import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles/index.js";

const MEDIUM_ID = /-([0-9a-f]{8,16})(?:[?#/]|$)/;
const slugByMediumId = new Map(articles.map(({ id, slug }) => [id, slug]));

const TAGS = {
  p: "p",
  h3: "h2",
  h4: "h3",
  ul: "ul",
  ol: "ol",
  li: "li",
  blockquote: "blockquote",
  figure: "figure",
  figcaption: "figcaption",
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  code: "code",
  hr: "hr",
};

const isSafeUrl = (href) => /^(https?:|mailto:)/i.test(href);

const preText = (node) =>
  [...node.childNodes]
    .map((child) =>
      child.nodeName === "BR" ? "\n" : child.nodeType === Node.TEXT_NODE ? child.textContent : preText(child),
    )
    .join("");

function renderLink(node, key, children) {
  const href = node.getAttribute("href") || "";
  if (!isSafeUrl(href)) return <Fragment key={key}>{children}</Fragment>;

  const id = /medium\.com/.test(href) && href.match(MEDIUM_ID)?.[1];
  if (id && slugByMediumId.has(id)) {
    return (
      <Link key={key} to={`/publications/${slugByMediumId.get(id)}`}>
        {children}
      </Link>
    );
  }
  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function renderImage(node, key) {
  const src = node.getAttribute("src") || "";
  if (!src.startsWith("/articles/") && !isSafeUrl(src)) return null;
  const img = <img src={src} alt={node.getAttribute("alt") || ""} loading="lazy" decoding="async" />;

  if (src.startsWith("/articles/") && src.endsWith(".gif")) {
    return (
      <picture key={key}>
        <source media="(prefers-reduced-motion: reduce)" srcSet={src.replace(/\.gif$/, ".still.jpg")} />
        {img}
      </picture>
    );
  }
  return <Fragment key={key}>{img}</Fragment>;
}

function renderNode(node, key) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const tag = node.nodeName.toLowerCase();
  const children = () => [...node.childNodes].map(renderNode);

  if (tag === "br") return <br key={key} />;
  if (tag === "img") return renderImage(node, key);
  if (tag === "a") return renderLink(node, key, children());
  if (tag === "pre") {
    return (
      <pre key={key}>
        <code>{preText(node)}</code>
      </pre>
    );
  }

  const Tag = TAGS[tag];
  return Tag ? <Tag key={key}>{children()}</Tag> : <Fragment key={key}>{children()}</Fragment>;
}

export default function ArticleBody({ html }) {
  const content = useMemo(() => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return [...doc.body.childNodes].map(renderNode);
  }, [html]);

  return <div className="article-body">{content}</div>;
}
