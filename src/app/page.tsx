'use client'

import { getProducts } from "@/apis/api";
import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import IconButton from "@/components/ui/IconButton";
import routes from "@/configs/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from 'react-feather';

export default function Home() {
  const router = useRouter();

  const products = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const renderProducts = products.data?.map((product, index) => {
    return (
      <div key={index} className="flex flex-col items-center">
        <Image alt="Imagem do produto" src={product.image} width={256} height={256} />
      </div>
    );
  })

  return (
    <div className="p-6">
      <main className="max-w-5xl mx-auto">
        <header className="flex justify-between">
          <H1>Meus Produtos</H1>
          <IconButton
            onClick={() => router.push(routes.products.create.route)}
          >
            <Plus />
          </IconButton>
        </header>
        <section>
          { renderProducts }
        </section>
      </main>
    </div>
  );
}
