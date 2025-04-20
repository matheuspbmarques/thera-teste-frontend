import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather";
import colors from 'tailwindcss/colors'

type PaginationProps = {
    pagesTotal?: number,
    currentPage?: number,
    onChangePage?: (pageNumber: number) => void
}

export default function Pagination ({
    pagesTotal,
    currentPage,
    onChangePage
}:PaginationProps) {
    const [pages, setPages] = useState<Array<number>>([]);

    useEffect(() => {
        if (typeof pagesTotal !== 'undefined') {
            const newPages: Array<number> = [];

            for (let i = 0; i < pagesTotal; i++) {
                newPages.push(i + 1);
            };

            setPages(newPages);
        }
    }, [pagesTotal]);

    const renderPagesNumbers = pages.map((pageNumber, index) => {
        return <span
            key={index}
            className="border-gray-300 rounded-lg p-2 min-w-[42px] text-center cursor-pointer outline outline-gray-300 hover:outline-none hover:bg-blue-700 hover:text-white duration-300"
            style={{
                backgroundColor: currentPage == pageNumber ? colors.blue[700] : undefined,
                color: currentPage == pageNumber ? 'white' : undefined,
                outline: currentPage == pageNumber ? 'none' : undefined,
            }}
            onClick={() => onChangePage && onChangePage(pageNumber)}
        >{ pageNumber }</span>;
    });

    return (
        <div className="mt-6 flex justify-center gap-2">
            {((currentPage && pagesTotal) && currentPage > 1) && <button
                className="text-slate-800 rounded-lg p-2 outline outline-gray-300 hover:bg-blue-700 hover:text-white duration-300 cursor-pointer"
                onClick={() => (currentPage && onChangePage) && onChangePage(currentPage - 1)}
            >
                <ChevronLeft />
            </button>}
            { renderPagesNumbers }
            {((currentPage && pagesTotal) && currentPage < pagesTotal) && <button
                className="text-slate-800 rounded-lg p-2 outline outline-gray-300 hover:bg-blue-700 hover:text-white duration-300 cursor-pointer"
                onClick={() => (currentPage && onChangePage) && onChangePage(currentPage + 1)}
            >
                <ChevronRight />
            </button>}
        </div>
    );
};