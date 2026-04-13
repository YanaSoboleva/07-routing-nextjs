'use client'; // Додайте, якщо всередині лейауту є інтерактивність

import React from 'react';
import css from './LayoutNotes.module.css';

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode; // Слот @sidebar
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      {/* Слот для фільтрів */}
      <aside className={css.sidebar}>
        {sidebar}
      </aside>

      {/* Основний список нотаток */}
      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  );
}