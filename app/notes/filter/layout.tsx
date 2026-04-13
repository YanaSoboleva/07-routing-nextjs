export default function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Тут може бути заголовок фільтрів або додаткова навігація */}
      {children}
    </section>
  );
}