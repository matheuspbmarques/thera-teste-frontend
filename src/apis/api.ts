import { ProductsPostProductsBody } from "@/@types/apis/api/Product.type";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const createProduct = async function (product: ProductsPostProductsBody) {
  const response = await api.post<AxiosResponse, AxiosResponse, ProductsPostProductsBody>('/products', product)
  return response;
};

export default api;