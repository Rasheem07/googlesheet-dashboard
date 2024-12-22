// filepath: /c:/Users/LENOVO/OneDrive/Desktop/tech/sheets project/client/src/app/[locale]/products/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default function ProductsPage({}: Props) {

  const CategoryOptions: {
    image: string;
    title: string;
    description: string;
  }[] = [
    {
      image: "/men-kandora.jpg",
      title: "NUBRAS GENTS KANDORA SECTION",
      description: "Elegant traditional Kandora for men.",
    },
    {
      image: "/men-items.jpg",
      title: "NUBRAS GENTS ITEM'S SECTION",
      description: "Essential accessories and clothing for men.",
    },
    {
      image: "/men-jacket.jpg",
      title: "NUBRAS GENTS JACKET SECTION",
      description: "Stylish jackets for every occasion.",
    },
    {
      image: "/kids-clothes.jpg",
      title: "NUBRAS JUNIOR KID'S SECTION",
      description: "Trendy and comfortable kids' clothing.",
    },
  ];

  return (
    <div className="space-y-5 p-5">
      <h1 className="text-2xl font-bold text-primary dark:text-primary">
        Nubras product sections
      </h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 grid-flow-row">
        {CategoryOptions.map((category, index) => (
          <CategoryCard
            title={category.title}
            key={index}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  imgsrc,
  description,
}: {
  title: string;
  imgsrc?: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="space-y-6">
        {imgsrc ? (
          <Image
            height={250}
            width={300}
            loading="lazy"
            alt={title}
            src={imgsrc}
            quality={100}
            className="w-full max-h-[300px] object-cover rounded-lg"
          />
        ) : (
          <div className="min-h-[300px] font-bold gap-y-4 text-zinc-700 rounded-lg bg-[#DEDEDE]/80 flex flex-col items-center justify-center">
            {" "}
            <ImageIcon className="h-12 w-12 text-zinc-700" /> Your background
            image goes here...{" "}
          </div>
        )}
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Link href={`/en/products/${title}`}>
          <Button className="w-full bg-blue-600  text-zinc-100 hover:bg-blue-700">View all products</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
