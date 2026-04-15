import css from '../LayoutNotes.module.css'; // Переконайся, що шлях правильний

export default function FilterLayout({
  children,
  sidebar, // Це саме той контент з папки @sidebar
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.container}> 
      {/* Контент із папки @sidebar потрапить сюди */}
      <aside className={css.sidebar}>
        {sidebar} 
      </aside>

      {/* Контент із папки [...slug] (самі нотатки) потрапить сюди */}
      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  );
}
