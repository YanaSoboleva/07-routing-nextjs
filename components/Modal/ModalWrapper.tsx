'use client';

import { useRouter } from 'next/navigation';
import Modal from './Modal'; 

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  return (
    <Modal onClose={onDismiss}>
      {children}
    </Modal>
  );
}