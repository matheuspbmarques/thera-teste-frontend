import { ProductsPostProductsBody } from "@/@types/apis/api/Product.type";
import { ProductsGetProductsResponse } from "@/@types/apis/api/Product.type";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const getProducts = async function () {
    const response = await api.get<ProductsGetProductsResponse>("/products");
    return response.data;
};

export const createProduct = async function (product: ProductsPostProductsBody) {
  const response = await api.post<AxiosResponse, AxiosResponse, ProductsPostProductsBody>('/products', product)
  return response;
};