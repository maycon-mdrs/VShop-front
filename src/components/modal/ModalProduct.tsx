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
import { FormsNewProduct } from "@/components/newProduct/FormsNewProduct";
import { IProduct } from "@/interfaces/IProduct";
import { TbEdit } from "react-icons/tb";

export function ModalProduct({ initialValues }: { initialValues: Partial<IProduct> | null }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleModal}>
            <DialogTrigger asChild>
                {initialValues ?
                    <div><TbEdit size={22} className="text-muted-foreground cursor-pointer" /></div>
                    :<Button>New product</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {initialValues ?
                            'Edite product'
                            : 'New product'}
                    </DialogTitle>
                </DialogHeader>
                <FormsNewProduct handleClose={handleModal} initialValues={initialValues as Partial<IProduct>} />
            </DialogContent>
        </Dialog>
    )
}
