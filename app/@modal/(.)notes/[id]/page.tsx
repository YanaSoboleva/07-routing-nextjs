'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

export default function NoteModalPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // Розгортаємо Promise

  return (
    <Modal onClose={() => router.back()}>
      {/* Тепер ми явно передаємо id, і Vercel не буде сваритися */}
      <NoteDetailsClient id={id} />
    </Modal>
  );
}
// export default function NoteModalPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
//   const { id } = use(params); // Розгортаємо Promise

//   return (
//     <Modal onClose={() => router.back()}>
//       <NoteDetailsClient id={id} />
//     </Modal>
//   );
// }
// 'use client';

// import { useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';


// // Важливо: Next.js автоматично передає params у цей компонент
// export default function NoteModalPage({ params }: { params: { id: string } }) {
//   const router = useRouter();

//   // Функція для закриття модалки (повертає користувача на попередню сторінку /notes)
//   const onDismiss = () => {
//     router.back();
//   };

//   return (
//     <Modal onClose={onDismiss}>
//       {/* Рендеримо деталі нотатки, передаючи їй ID */}
//       <NoteDetailsClient id={params.id} />
//     </Modal>
//   );
// }