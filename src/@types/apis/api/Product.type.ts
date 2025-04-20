export type ProductsGetProductsResponse = Array<{
    id: string,
    name: string,
    price: number,
    description: string,
    image: string
}>;
export type ProductsPostProductsBody = {
    name: string,
    price: number,
    description: string,
    image: string
};