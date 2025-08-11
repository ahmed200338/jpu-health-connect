// Simple SEO helpers
export const setPageSEO = (title: string, description?: string, canonical?: string) => {
  document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (description) {
    if (metaDesc) metaDesc.setAttribute('content', description);
    else {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      m.setAttribute('content', description);
      document.head.appendChild(m);
    }
  }
  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }
};
