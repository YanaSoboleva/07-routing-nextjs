'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import fetchAllNotes from '@/lib/api'; // Переконайтеся, що функція існує
import css from './Notes.client.module.css'; // Створіть цей файл для стилів

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string; // Використовуємо 'tag', як у вашій моделі
}

interface NotesClientProps {
  activeTag: string | undefined; // 'all' або конкретний тег
}

export default function NotesClient({ activeTag }: NotesClientProps) {
  const { data: notes, isLoading, isError } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchAllNotes,
  });

  if (isLoading) return <div className={css.loader}>Завантаження списку нотаток...</div>;
  if (isError) return <div className={css.error}>Не вдалося завантажити нотатки.</div>;

  /**
   * Фільтруємо нотатки на стороні клієнта:
   * Якщо activeTag відсутній або дорівнює 'all', показуємо всі.
   * Інакше фільтруємо за збігом тегу.
   */
  const filteredNotes = notes?.filter((note) => {
    if (!activeTag || activeTag === 'all') return true;
    return note.tag?.toLowerCase() === activeTag.toLowerCase();
  });

  return (
    <div className={css.grid}>
      {filteredNotes && filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <div key={note.id} className={css.card}>
            <h3 className={css.cardTitle}>{note.title}</h3>
            <p className={css.cardPreview}>
              {note.content.substring(0, 100)}...
            </p>
            <div className={css.cardFooter}>
              <span className={css.tag}>#{note.tag}</span>
              {/* При кліку активується Intercepting Route */}
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className={css.empty}>Нотаток із таким тегом не знайдено.</p>
      )}
    </div>
  );
}