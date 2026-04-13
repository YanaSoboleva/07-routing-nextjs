'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
// Переконайтеся, що файл стилів лежить за цим шляхом
import css from './NoteDetails/NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  id?: string; // Знак '?' робить проп опціональним для успішного білду
}

export default function NoteDetailsClient({ id: propId }: NoteDetailsClientProps) {
  const params = useParams();

  // Визначаємо noteId: пріоритет пропу (для модалки), інакше з URL
  const noteId = propId || (params?.id as string);

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    // Запит активується лише при наявності коректного рядка ID
    enabled: !!noteId && typeof noteId === 'string' && !noteId.includes('[object'),
    refetchOnMount: true,
  });

  if (isLoading) {
    return <div className={css.loader}>Завантаження деталей нотатки...</div>;
  }

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

      {note.tags && note.tags.length > 0 && (
        <footer className={css.footer}>
          <div className={css.tags}>
            {note.tags.map((tag: string) => (
              <span key={tag} className={css.tag}>#{tag}</span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}