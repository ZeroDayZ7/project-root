'use client'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
} from '@neo/ui';
import { Loader } from '@neo/ui';

export default function ConfirmDialog() {
  return (
    <>
 <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      <Button>Confirm</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


</>
  )
}
