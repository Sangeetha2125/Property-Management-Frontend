import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../ui/dialog";
  import { Button } from "../../ui/button";

  
  export default function AgreementDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">Create Agreement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Agreement</DialogTitle> 
            <DialogDescription>
                The owner has accepted your request. Enter details below to create agreement.
            </DialogDescription>
          </DialogHeader>
          {/* <AgreementForm/> */}
        </DialogContent>
      </Dialog>
    );
  }
  