import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardNavigation } from "../components/dashboard/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({children} : {children: React.ReactNode}){

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "ahmedshababn91@gmail.com") {
    return redirect("/");
  }
    return (
      <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6">
         <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
           <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
             <DashboardNavigation />
           </nav>

           <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              variant="outline"
              size="icon"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col p-3 gap-6 text-lg font-medium mt-5">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink >Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </header>
        <main className="my-5">
          {children}
        </main>
      </div>
    );
}