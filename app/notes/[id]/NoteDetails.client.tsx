'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
// Переконайтеся, що регістр букв у назві папки та файлу збігається
import css from './NoteDetails/NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  id?: string | string[] | undefined; // Робимо проп максимально гнучким для TS
}

export default function NoteDetailsClient({ id: propId }: NoteDetailsClientProps) {
  const params = useParams();

  // Обробляємо ID: пріоритет пропу, потім параметри URL
  const rawId = propId || params?.id;
  const noteId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    // Запит активується тільки при наявності реального рядка ID
    enabled: !!noteId && typeof noteId === 'string' && !noteId.includes('[object'),
    refetchOnMount: true,
  });

  if (isLoading) return <div className={css.loader}>Завантаження...</div>;

  if (isError || !note) {
    return (
      <div className={css.error}>
        <p>Помилка: {error instanceof Error ? error.message : 'Нотатку не знайдено'}</p>
      </div>
    );
  }

  return (
    <article className={css.container}>
      <header className={css.header}>
        <h1 className={css.title}>{note.title}</h1>
      </header>
      
      <div className={css.content}>
        <p className={css.text}>{note.content}</p>
      </div>

      {/* Використовуємо 'tag', оскільки 'tags' не існує в моделі */}
      {note.tag && (
        <footer className={css.footer}>
          <div className={css.tags}>
            <span className={css.tag}>#{note.tag}</span>
          </div>
        </footer>
      )}
    </article>
  );
}