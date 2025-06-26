// File: app/dashboard/products/[id]/delete/page.tsx

import { deleteProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DeleteRoute(props: PageProps) {
  noStore();

  const { id } = await props.params;

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Card className="max-w-xl w-full flex flex-col p-8 gap-6">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription className="mt-2">
            This action cannot be undone. This will permanently delete this
            product and remove all data from our servers.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/products">Cancel</Link>
          </Button>
          <form action={deleteProduct}>
           
            <input type="hidden" name="productId" value={id} />
            <SubmitButton variant="destructive" text="Delete Product" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
