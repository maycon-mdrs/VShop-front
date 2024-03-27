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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Filter } from "@/components/Filter";
import { useCategoryData, useCategoryDelete } from "@/hooks/useCategoryData";
import { useProductData } from "@/hooks/useProductData";
import { ModalCategory } from "@/components/modal/ModalCategory";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/ICategory";

export function ListCategories() {
    const [searchParams] = useSearchParams();
    const { data } = useCategoryData();
    const { data: products } = useProductData();

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
                            <TableHead>Title</TableHead>
                            <TableHead className="text-center">Quantity of products</TableHead>
                            <TableHead className="text-center">Total stock</TableHead>
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
                                                <DotsHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild><ModalCategory initialValues={category} /></DropdownMenuItem>
                                            <DropdownMenuItem asChild><ButtonDelete category={category} /></DropdownMenuItem>
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

function ButtonDelete({ category }: { category: ICategory }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate, isSuccess } = useCategoryDelete();

    const handleClose = () => {
        setIsModalOpen(prev => !prev);
    }

    useEffect(() => {
        handleClose();
    }, [isSuccess]);
    
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                    Delete
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your category and his products.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={() => mutate(category.categoryId!)}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
