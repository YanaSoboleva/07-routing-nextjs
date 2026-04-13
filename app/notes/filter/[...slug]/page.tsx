// import NotesClient from '@/app/notes/NotesClient/Notes.client';
import NotesClient from '../../NotesClient/Notes.client';

interface FilterPageProps {
  params: { slug?: string[] };
}

export default async function FilteredNotesPage({ params }: FilterPageProps) {
  const resolvedParams = await params; // Додайте await
  const tagParam = resolvedParams.slug?.[0];
  // Якщо "all", передаємо undefined, щоб бекенд повернув усе
  const activeTag = tagParam === 'all' ? undefined : tagParam;

  return <NotesClient initialTag={activeTag} />;
}