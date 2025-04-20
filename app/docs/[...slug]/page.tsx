interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const slug = await params;
  console.log(slug);
  return <div>DocsPage</div>;
}
