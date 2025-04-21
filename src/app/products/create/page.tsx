'use client'

import InputText from "@/components/form/InputText";
import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import { Home, Save } from 'react-feather';
import TextArea from "@/components/form/Textarea";
import InputDecimal from "@/components/form/InputDecimal";
import useForm, { UseFormCheck } from "@/hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/apis/api";
import { ProductsPostProductsBody } from "@/@types/apis/api/Product.type";
import useMessage from "@/hooks/useMessage";
import Alert from "@/components/ui/Alert";
import Image from "next/image";
import newProductIllustration from '@/assets/illustrations/new-product.svg'
import { useRouter } from "next/navigation";
import routes from "@/configs/routes";

type Form = {
    name: string,
    price: number,
    description: string,
    image: string,
    category: string
};

const formCheck: UseFormCheck<Form> = {
    name: {
        type: 'text',
        min: [1, 'Informe o nome do produto']
    },
    price: {
        type: 'decimal',
        min: [1, 'Informe o preço do produto']
    },
    description: {
        type: 'text',
        min: [1, 'Informe a descrição do produto']
    },
    image: {
        type: 'url',
        invalidMessage: 'A URL da image do produto é invalida',
        requiredMessage: 'Informe a URL da imagem do produto'
    },
    category: {
        type: 'text',
        min: [1, 'Informe a categoria do produto']
    }
};

export default function ProductsCreate() {
    const router = useRouter();

    const [successMessage, setSuccessMessage] = useMessage(5000);

    const { handleOnSubmit, register, inputError, resetFormData } = useForm<Form>(formCheck);

    const submit = useMutation({
        mutationFn: (product: ProductsPostProductsBody) => createProduct(product),
        onSuccess: () => {
            setSuccessMessage('Produto adicionado com sucesso!');
            resetFormData();
        }
    });

    return (<>
        <div className="p-6">
            <main className="max-w-3xl mx-auto">
                <header className="flex justify-between mb-4">
                    <H1>Cadastrar Produto</H1>
                    <Button
                        onClick={() => router.push(routes.index.route)}
                        startIcon={<Home />}
                    >
                        Início
                    </Button>
                </header>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex sm:flex-1 sm:h-80 sm:items-center sm:justify-center">
                        <Image alt="Ilustração de formulário de adição de produtos" src={newProductIllustration} priority />
                    </div>
                    <form onSubmit={handleOnSubmit(submit.mutate)} className="flex flex-col gap-4 flex-1">
                        <div className="flex flex-col gap-2">
                            <InputText
                                id="name"
                                label="Nome"
                                placeholder="Nome do produto"
                                register={register.inputText("name")}
                                errorMessages={inputError.name}
                            />
                            <TextArea
                                id="description"
                                label="Descrição"
                                placeholder="Descrição do produto"
                                register={register.inputTextArea("description")}
                                errorMessages={inputError.description}
                            />
                            <InputText
                                id="category"
                                label="Categoria"
                                placeholder="Categoria do produto"
                                register={register.inputText("category")}
                                errorMessages={inputError.name}
                            />
                            <InputDecimal
                                id="price"
                                label="Preço"
                                placeholder="Preço do produto"
                                errorMessages={inputError.price}
                                register={register.inputDecimal('price')}
                            />
                            <InputText
                                id="image"
                                label="Imagem"
                                placeholder="URL da imagem"
                                register={register.inputText("image")}
                                errorMessages={inputError.image}
                            />
                        </div>
                        <Button
                            className="justify-center"
                            startIcon={<Save />}
                            type="submit"
                            loadingText="Salvando..."
                            isLoading={submit.isPending}
                        >Cadastrar</Button>
                    </form>
                </div>
            </main>
        </div>
        {successMessage && <Alert color="success" onClose={() => setSuccessMessage(undefined)}>{successMessage}</Alert>}
    </>)
}