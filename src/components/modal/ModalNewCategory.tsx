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

export function ModalNewCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(prev => !prev);
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={handleModal}>
            <DialogTrigger asChild>
                <Button>New category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New category</DialogTitle>
                    <DialogDescription>Add a new category for products.</DialogDescription>
                </DialogHeader>
                <FormsNewCategory handleClose={handleModal} />
            </DialogContent>
        </Dialog>
    )
}
