import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../ui/dialog";
  import { Button } from "../../ui/button";

import AgreementForm from "./AgreementForm";
  
  export default function AgreementDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Create Agreement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Agreement</DialogTitle>
            <DialogDescription>
                The owner has accepted your request. Enter details below to create agreement.
            </DialogDescription>
          </DialogHeader>
          <AgreementForm/>
        </DialogContent>
      </Dialog>
    );
  }
  