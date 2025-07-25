import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
    select: { price: true, images: true, description: true, name: true, id: true },
  });
  if (!data) return notFound();
  return data;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: PageProps) {
  noStore();
  const { id } = await props.params;           
  const data = await getData(id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ...">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl ...">{data.name}</h1>
          <p className="text-3xl ...">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <p className="text-base ...">{data.description}</p>
          <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
