import NotesClient from './Notes.client';

interface FilterPageProps {
  params: { slug?: string[] };
}

export default async function FilteredNotesPage({ params }: FilterPageProps) {
  const resolvedParams = await params; 
  const tagParam = resolvedParams.slug?.[0];
  const activeTag = tagParam === 'all' ? undefined : tagParam;

  return <NotesClient key={activeTag} initialTag={activeTag} />

  // return <NotesClient initialTag={activeTag} />;
}