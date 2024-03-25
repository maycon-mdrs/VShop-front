import { useSearchParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Filter } from "@/components/Filter";
import { useCategoryData, useCategoryDelete } from "@/hooks/useCategoryData";
import { useProductData } from "@/hooks/useProductData";

export function ListCategories() {
    const [searchParams] = useSearchParams();
    const { data } = useCategoryData();
    const { mutate } = useCategoryDelete();
    const products = useProductData().data;

    // Filtro de dados baseado nos searchParams
    const filteredData = (data ?? []).filter(category => {
        const titleFilter = searchParams.get('title')?.toLowerCase();

        const matchesTitle = titleFilter ? category.name.toLowerCase().includes(titleFilter) : true;
        let matches = true;

        return matchesTitle && matches;
    });

    return (
        <div className="flex flex-col w-full gap-4">
            <Filter />
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead className="text-center">Quantidade de produtos</TableHead>
                            <TableHead className="text-center">Total de estoque</TableHead>
                            <TableHead className="text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((category, index) => (
                            <TableRow key={index}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell className="text-center">{(products ?? []).filter(product => product.categoryId === category.categoryId).length}</TableCell>
                                <TableCell className="text-center">{(products ?? []).filter(product => product.categoryId === category.categoryId).reduce((acc, product) => acc + (product.stock ?? 0), 0)}</TableCell>
                                <TableCell className="text-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <DotsHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => mutate(category.categoryId!)}>Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
