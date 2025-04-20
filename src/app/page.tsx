'use client'

import { getProducts } from "@/apis/api";
import InputDecimal from "@/components/form/InputDecimal";
import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import IconButton from "@/components/ui/IconButton";
import routes from "@/configs/routes";
import useForm from "@/hooks/useForm";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Search, Filter, X } from 'react-feather';
import ProductCard from "./(components)/ProductCard";

type SearchForm = {
	search?: string
};
type FilterForm = {
	minPrice?: number,
	maxPrice?: number
};

export default function Home() {
	const router = useRouter();

	const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

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
		}
	});

	const products = useQuery({
		queryKey: ['products'],
		queryFn: getProducts
	});

	function submitSearch({ search }: SearchForm) {
		console.log(search);
	};

	function submitFilter({ minPrice, maxPrice }: FilterForm) {
		console.log(minPrice, maxPrice);
		setShowFilterModal(false)
	};

	const renderProducts = products.data?.map((product, index) => {
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
					<div className="flex gap-2">
						<form
							onSubmit={searchForm.handleOnSubmit(submitSearch)}
							className="flex min-w-0 bg-white rounded-lg outline outline-gray-300 hover:outline-black has-focus:outline-blue-700 duration-300 flex-1"
						>
							<input
								type="search"
								className="flex-1 py-2 pl-2 outline-none min-w-0"
								placeholder="Procurar..."
								{...searchForm.register.inputText('search')}
							/>
							<button type="submit" className="p-2 hover:text-blue-700 duration-300">
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
									className="bg-white p-4 rounded-2xl m-auto w-full flex flex-col gap-4"
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
							<div className="flex gap-2">
								<InputDecimal
									placeholder="Valor Mínimo"
									register={filterForm.register.inputDecimal('minPrice')}
								/>
								<InputDecimal
									placeholder="Valor Máximo"
									register={filterForm.register.inputDecimal('maxPrice')}
								/>
							</div>
							<Button type="submit">Filtrar</Button>
						</form>
					</div>
				</header>
				<section className="flex flex-col gap-2 mt-6 sm:grid sm:grid-cols-3 lg:grid-cols-4">
					{renderProducts}
				</section>
			</main>
		</div>
	);
}
