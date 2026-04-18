// 'use client';

// import { use } from 'react';
// import { useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default function NoteModalPage({ params }: PageProps) {
//   const router = useRouter();
//   const { id } = use(params);
//   const onDismiss = () => {
//     router.back();
//   };

//   return (
//     <Modal onClose={onDismiss}>
//       <NoteDetailsClient id={id} />
//     </Modal>
//   );
// }


import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalWrapper>
        <NoteDetailsClient id={id} />
      </ModalWrapper>
    </HydrationBoundary>
  );
}