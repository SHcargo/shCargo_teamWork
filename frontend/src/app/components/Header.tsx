import NotfIcon from "../ui/NotfIcon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotifContent from "./NotifContent";
import Logo from "@/components/ui/logoSh";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import useStepStore from "./step";

const Header = () => {
  const router = useRouter();
  const { setStep } = useStepStore();

  return (
    <div className="w-screen flex justify-center h-[70px] fixed top-0 z-50">
      <div className="max-w-2xl w-full px-6 bg-[#101010] shadow-md flex justify-between items-center">
        <div
          className="flex gap-3 cursor-pointer"
          onClick={() => {
            setStep("home");
            router.push("/");
          }}
        >
          <Logo className="w-30 h-fit" />
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <button className="rounded-lg p-2 cursor-pointer bg-[#303030]">
                <NotfIcon />
              </button>
            </DropdownMenuTrigger>
            <NotifContent />
          </DropdownMenu>
          <Dialog>
            <DialogTrigger>
              <div className="bg-[#303030] p-2 rounded-lg cursor-pointer">
                <LogOut stroke="white" width={22} height={22} />
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
              <DialogHeader>
                <DialogTitle>
                  Та системээс гарахдаа итгэлтэй байна уу
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex gap-6">
              <div
  className="px-6 cursor-pointer text-white bg-black py-1 rounded-lg"
  onClick={() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("loginTime");
      router.push("/logIn");
    }
  }}
>
  Тийм
</div>

                <DialogClose>
                  <div className="px-6 cursor-pointer text-white bg-black py-1 rounded-lg">
                    Үгүй
                  </div>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
