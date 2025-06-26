

import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

interface CategoryResult {
  title: string;
  data: Array<{
    id: string;
    name: string;
    images: string[];
    price: number;
    description: string;
  }>;
}

async function getData(productCategory: string): Promise<CategoryResult> {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        where: { status: "published" },
        select: { id: true, name: true, images: true, price: true, description: true },
      });
      return { title: "All Products", data };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: "men" },
        select: { id: true, name: true, images: true, price: true, description: true },
      });
      return { title: "Products for Men", data };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: "women" },
        select: { id: true, name: true, images: true, price: true, description: true },
      });
      return { title: "Products for Women", data };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: "kids" },
        select: { id: true, name: true, images: true, price: true, description: true },
      });
      return { title: "Products for Kids", data };
    }
    default:
      return notFound();
  }
}

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function CategoriesPage(props: PageProps) {
  noStore();

  const { name } = await props.params;

  const { data, title } = await getData(name);

  return (
    <section className="px-4 py-6">
      <h1 className="text-3xl font-semibold mb-5">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
