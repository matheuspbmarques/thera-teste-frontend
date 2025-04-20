import parseToRealString from "@/tools/parseToRealString";
import Image from "next/image";

type ProductCardProps = {
    image: string,
    name: string,
    description: string,
    price: number,
    category: string
}

export default function ProductCard({
    image,
    name,
    description,
    price,
    category
}:ProductCardProps) {
    return (
        <div className="flex flex-col items-center bg-white rounded-lg overflow-auto drop-shadow-lg">
            <div className="w-full aspect-square bg-white overflow-hidden relative">
                <Image
                    alt="Imagem do produto"
                    src={image}
                    width={512}
                    height={512}
                    className="absolute top-1/2 left-1/2 -translate-1/2"
                />
            </div>
            <div className="flex flex-col items-start p-2 w-full flex-1">
                <p className="font-bold">{name}</p>
                <p className="text-left text-sm flex-1">{description}</p>
                <p className="text-left mt-2">{parseToRealString(price)}</p>
                <p className="text-left font-bold text-xs">{category}</p>
            </div>
        </div>
    )
}