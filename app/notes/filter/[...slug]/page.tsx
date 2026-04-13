import NotesClient from '@/app/notes/NotesClient/Notes.client';

interface FilterPageProps {
  params: { slug?: string[] };
}

export default function FilteredNotesPage({ params }: FilterPageProps) {
  // Catch-all повертає масив, беремо перший елемент
  const tagParam = params.slug?.[0];
  // Якщо "all", передаємо undefined, щоб бекенд повернув усе
  const activeTag = tagParam === 'all' ? undefined : tagParam;

  return <NotesClient initialTag={activeTag} />;
}