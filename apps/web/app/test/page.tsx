'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, Input } from '@neo/ui';
import { Loader } from '@neo/ui';
import { AlertDemo } from './Alert';
// import { Button } from '@/components/button';
import { Button as Button1} from '@neo/ui';
import { DialogDemo } from './DialogDemo';



export default function TestDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => {
          console.log('Test button clicked');
          setIsOpen(true);
        }}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Otwórz Dialog
      </button>
      {/* <Button variant='default'>LOKALNIE</Button> */}
      <Button1 variant='default'>Z PACZKI</Button1>
      <Input></Input>
      <AlertDemo />
      <DialogDemo />
      <Loader />
      {/* Dialog component from @neo/ui */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>To jest testowy dialog.</DialogDescription>
          <p>Treść tutaj</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}