'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails/NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  id: string; // Додаємо опис пропа
}

export default function NoteDetailsClient({ id: propId }: NoteDetailsClientProps) {
  const params = useParams();
  
  // Пріоритет: якщо є propId (з модалки), беремо його. 
  // Якщо немає — беремо з URL (params.id)
  const noteId = propId || (params.id as string);

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId], // Було id -> стало noteId
    queryFn: () => fetchNoteById(noteId), // Було id -> стало noteId
    enabled: !!noteId, // Додайте це, щоб уникнути запитів з пустим ID
    refetchOnMount: false, 
    retry: 1,
  });

  if (isLoading) {
    return <div className={css.loader}>Завантаження деталей нотатки...</div>;
  }

  if (isError) {
    return (
      <div className={css.error}>
        Помилка: {error instanceof Error ? error.message : 'Не вдалося завантажити нотатку'}
      </div>
    );
  }

  if (!note) {
    return <div className={css.notFound}>Нотатку не знайдено</div>;
  }

  return (
    <article className={css.container}>
      <header className={css.header}>
        <h1 className={css.title}>{note.title}</h1>
        <span className={css.tag}>{note.tag}</span>
      </header>
      
      <div className={css.content}>
        <p className={css.text}>{note.content}</p>
      </div>

      <footer className={css.footer}>
        <p className={css.date}>
          Створено: {new Date(note.createdAt).toLocaleString()}
        </p>
        <p className={css.date}>
          Оновлено: {new Date(note.updatedAt).toLocaleString()}
        </p>
      </footer>
    </article>
  );
}