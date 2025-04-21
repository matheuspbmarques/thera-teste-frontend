'use client'

import InputDecimal from "@/components/form/InputDecimal";
import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import IconButton from "@/components/ui/IconButton";
import routes from "@/configs/routes";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Plus, Search, Filter, X } from 'react-feather';
import ProductCard from "./(components)/ProductCard";
import noProductIllustrationSvg from '@/assets/illustrations/no-product.svg';
import Image from "next/image";
import { ProductsGetProductsResponse } from "@/@types/apis/api/Product.type";
import api from "@/apis/api";
import { Product } from "@/@types/database/Product.type";
import InputSelect from "@/components/form/InputSelect";
import { JsonServerPaginateReturn } from "@/@types/libs/jsonServer.type";
import Pagination from "./(components)/Pagination";

type SearchForm = {
	search?: string
};
type FilterForm = {
	minPrice?: number,
	maxPrice?: number,
	priceOrder?: 'minToMax' | 'maxToMin'
};

const priceOrderList = [
	{
		name: 'Menor para maior',
		value: 'minToMax'
	},
	{
		name: 'Maior para menor',
		value: 'maxToMin'
	},
]

export default function Home() {
	const router = useRouter();

	const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
	const [products, setProducts] = useState<Array<Product>>([]);
	const [pagesTotal, setPagesTotal] = useState<number>();
	const [currentPage, setCurrentPage] = useState<number>(1);

	const searchForm = useForm<SearchForm>({
		search: {
			type: 'text'
		}
	});
	const filterForm = useForm<FilterForm>({
		minPrice: {
			type: 'decimal'
		},
		maxPrice: {
			type: 'decimal'
		},
		priceOrder: {
			type: 'select'
		}
	});

	const getProducts = useCallback((searchFilter?: Partial<SearchForm> & Partial<FilterForm>) => {
		api.get<JsonServerPaginateReturn<ProductsGetProductsResponse>>("/products", {
			params: {
				'price_gte': searchFilter?.minPrice,
				'price_lte': searchFilter?.maxPrice,
				'name': searchFilter?.search,
				'_sort': `${searchFilter?.priceOrder === 'maxToMin' ? '-' : ''}price`,
				'_page': currentPage,
				'_per_page': 12
			}
		}).then(res => {
			setProducts(res.data.data);
			setPagesTotal(res.data.pages);

			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0 });
			};
		});
	}, [currentPage]);

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	function submitSearch({ search }: SearchForm) {
		getProducts({ search });
		setCurrentPage(1);
	};

	function submitFilter({ minPrice, maxPrice, priceOrder }: FilterForm) {
		getProducts({ minPrice, maxPrice, priceOrder });
		setShowFilterModal(false)
		setCurrentPage(1);
	};

	const renderProducts = products?.map((product, index) => {
		return <ProductCard
			key={index}
			{...product}
		/>
	});

	return (
		<div className="p-6">
			<main className="max-w-5xl mx-auto">
				<header className="flex flex-col gap-4">
					<div className="flex justify-between">
						<H1>Meus Produtos</H1>
						<IconButton
							onClick={() => router.push(routes.products.create.route)}
						>
							<Plus />
						</IconButton>
					</div>
					<div className="flex sm:flex-col gap-2">
						<form
							onSubmit={searchForm.handleOnSubmit(submitSearch)}
							className="flex min-w-0 bg-white rounded-lg outline outline-gray-300 hover:outline-black has-focus:outline-blue-700 duration-300 flex-1"
						>
							<input
								type="search"
								className="flex-1 py-2 pl-2 outline-none min-w-0 placeholder-gray-400 dark:text-slate-800"
								placeholder="Procurar..."
								{...searchForm.register.inputText('search')}
							/>
							<button type="submit" className="p-2 hover:text-blue-700 duration-300 text-gray-400">
								<Search />
							</button>
						</form>
						<div className="flex sm:hidden">
							<IconButton onClick={() => setShowFilterModal(true)}>
								<Filter />
							</IconButton>
							<div className="fixed left-0 top-0 bg-black/25 w-full h-dvh z-10 px-6" style={{
								display: showFilterModal ? 'flex' : 'none'
							}}>
								<form
									className="bg-white p-4 rounded-2xl m-auto w-full flex flex-col gap-4 dark:bg-slate-800"
									onSubmit={filterForm.handleOnSubmit(submitFilter)}
								>
									<header className="flex items-center">
										<p className="text-xl font-bold flex-1">Filtrar</p>
										<IconButton
											className="bg-rose-700 hover:bg-rose-500"
											onClick={() => setShowFilterModal(false)}
										>
											<X />
										</IconButton>
									</header>
									<div className="flex flex-col gap-2">
										<InputDecimal
											label="Valor Mínimo"
											register={filterForm.register.inputDecimal('minPrice')}
											placeholder="10,00"
										/>
										<InputDecimal
											label="Valor Máximo"
											register={filterForm.register.inputDecimal('maxPrice')}
											placeholder="100,00"
										/>
										<InputSelect
											label="Ordenar preço"
											placeholder="Ordenar de"
											options={priceOrderList}
											register={filterForm.register.inputSelect('priceOrder')}
										/>
										<Button
											type="submit"
											className="justify-center"
										>
											Filtrar
										</Button>
									</div>
								</form>
							</div>
						</div>
						<form
							onSubmit={filterForm.handleOnSubmit(submitFilter)}
							className="flex-1 gap-2 hidden sm:flex"
						>
							<div className="flex gap-2 flex-1">
								<InputDecimal
									placeholder="Valor Mínimo"
									register={filterForm.register.inputDecimal('minPrice')}
								/>
								<InputDecimal
									placeholder="Valor Máximo"
									register={filterForm.register.inputDecimal('maxPrice')}
								/>
								<InputSelect
									placeholder="Ordenar de"
									options={priceOrderList}
									register={filterForm.register.inputSelect('priceOrder')}
								/>
							</div>
							<Button type="submit" startIcon={<Filter />}>
								<span>Filtrar</span>
							</Button>
						</form>
					</div>
				</header>
				{
					products?.length > 0
						?
						<section className="flex flex-col gap-2 mt-6 sm:grid sm:grid-cols-3 lg:grid-cols-4">
							{renderProducts}
						</section>
						:
						<div>
							<Image alt="Sem Produtos" src={noProductIllustrationSvg} width={256} height={256} className="mx-auto mt-6" />
							<p className="text-center max-w-80 mx-auto">Ops! Você ainda não tem nenhum produto cadastrado</p>
						</div>
				}
				<Pagination
					pagesTotal={pagesTotal}
					currentPage={currentPage}
					onChangePage={pageNumber => setCurrentPage(pageNumber)}
				/>
			</main>
		</div>
	);
}
