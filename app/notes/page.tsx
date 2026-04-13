import { redirect } from 'next/navigation';

export default function NotesPage() {
  // Користувач заходить на /notes -> автоматично потрапляє на /notes/filter/all
  redirect('/notes/filter/all');
}