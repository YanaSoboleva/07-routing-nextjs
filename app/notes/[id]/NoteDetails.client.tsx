'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
// Переконайтеся, що шлях до CSS-модуля правильний
import css from './NoteDetails/NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  id?: string; // Опціональний проп для підтримки модалок та окремих сторінок
}

export default function NoteDetailsClient({ id: propId }: NoteDetailsClientProps) {
  const params = useParams();

  /**
   * Визначаємо noteId: 
   * 1. Пріоритет віддаємо propId (якщо компонент рендериться в модалці)
   * 2. Якщо пропса немає, беремо id з URL params
   */
  const noteId = propId || (params?.id as string);

  const { data: note, isLoading, isError, error } = useQuery({
    // queryKey залежить від noteId, тому дані оновляться при зміні нотатки без F5
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    /**
     * Запит активується лише якщо:
     * - noteId існує
     * - це рядок (не Promise чи об'єкт, що викликало 404)
     */
    enabled: !!noteId && typeof noteId === 'string' && !noteId.includes('[object'),
    refetchOnMount: true,
    retry: 1,
  });

  // Стан завантаження
  if (isLoading) {
    return (
      <div className={css.loader}>
        <p>Завантаження деталей нотатки...</p>
      </div>
    );
  }

  // Стан помилки або якщо нотатку не знайдено
  if (isError || !note) {
    return (
      <div className={css.error}>
        <p>Помилка: {error instanceof Error ? error.message : 'Нотатку не знайдено'}</p>
      </div>
    );
  }

  // Основний рендер контенту
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
              <span key={tag} className={css.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}