function normalizeLink(link) {
  if (!link) return "";
  try {
    const url = new URL(link.trim());
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return url.href;
  } catch {
    return link.trim().replace(/\/+$/, "");
  }
}

export function hasDistinctDemoLink(project, codeLinks = [project.githubLink]) {
  const demo = normalizeLink(project.demoLink);
  return Boolean(demo) && !codeLinks.some((link) => normalizeLink(link) === demo);
}
