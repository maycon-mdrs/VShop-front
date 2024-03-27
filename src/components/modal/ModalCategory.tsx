import { useState } from "react";
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
import { FormsNewCategory } from "@/components/newCategory/FormsNewCategory";
import { ICategory } from "@/interfaces/ICategory";

export function ModalCategory({ initialValues }: { initialValues: Partial<ICategory> | null }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleModal}>
            <DialogTrigger asChild>
                {
                    initialValues ?
                        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                            Edit
                        </div>
                        : <Button>New category</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {initialValues ?
                            `Edit the category ${initialValues.name}`
                            : 'New category'}
                    </DialogTitle>
                    <DialogDescription>
                        {initialValues ? 'Edit a category for products.' : 'Add a new category for products.'}
                    </DialogDescription>
                </DialogHeader>
                <FormsNewCategory handleClose={handleModal} initialValues={initialValues as Partial<ICategory>} />
            </DialogContent>
        </Dialog>
    )
}
