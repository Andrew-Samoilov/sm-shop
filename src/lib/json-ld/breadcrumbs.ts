export function buildBreadcrumbsJsonLd(breadcrumbs: { name: string; url: string }[], siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: crumb.name,
            item: siteUrl + crumb.url,
        })),
    };
}
