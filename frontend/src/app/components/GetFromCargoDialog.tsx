import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const GetFromCargoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-10 text-sm cursor-pointer font-medium rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors">
          🏢 Салбараас авах
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetFromCargoDialog;
