// 'use client';

// import { use } from 'react';
// import { useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

// export default function NoteModalPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
//   const { id } = use(params); // Розгортаємо Promise

//   return (
//     <Modal onClose={() => router.back()}>
//       {/* Тепер ми явно передаємо id, і Vercel не буде сваритися */}
//      <NoteDetailsClient id={params.id} 
//     </Modal>
//   );
// }
// export default function NoteModalPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
//   const { id } = use(params); // Розгортаємо Promise

//   return (
//     <Modal onClose={() => router.back()}>
//       <NoteDetailsClient id={id} />
//     </Modal>
//   );
// }
'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NoteModalPage({ params }: PageProps) {
  const router = useRouter();
  
  // Розпаковуємо Promise, щоб отримати чистий рядок ID
  const { id } = use(params);

  // Функція для закриття модалки (повертає користувача на попередню сторінку /notes)
  const onDismiss = () => {
    router.back();
  };

  return (
    <Modal onClose={onDismiss}>
      {/* Рендеримо деталі нотатки, передаючи їй ID */}
      <NoteDetailsClient id={id} />
    </Modal>
  );
}