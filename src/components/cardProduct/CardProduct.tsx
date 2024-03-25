import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

import { IProduct } from "@/interfaces/IProduct";
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { useProductDelete } from "@/hooks/useProductData";
import imageNotFound from "@/assets/image_notfound.png";

export function CardProduct(props: IProduct) {
    const { mutate, isSuccess } = useProductDelete();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(props.imageUrl);

    function buttonDelelte() {
        return (
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogTrigger>
                    <MdDeleteForever size={22} className="text-muted-foreground" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your product.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" variant="destructive" onClick={() => mutate(props.id!)}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    const handleEdit = () => {
        console.log("Editar produto");
    }

    const handleClose = () => {
        setIsModalOpen(prev => !prev);        
    }
    
    const onError = () => {
        setImageUrl(imageNotFound);
    };

    useEffect(() => {
        handleClose();
    }, [isSuccess]);

    return (
        <Card className="w-[250px]">
            <CardHeader className="p-2 pb-4">
                <div className="flex justify-between">
                    <TbEdit size={22} className="text-muted-foreground" onClick={handleEdit} />
                    {buttonDelelte()}
                </div>

                <img src={imageUrl} onError={onError} alt={props.name} className="w-auto h-40 object-scale-down" />
            </CardHeader>
            <CardContent className="flex justify-between">
                <div>
                    <CardTitle>{props.name}</CardTitle>
                    <CardDescription>R$ {props.price.toString().replace('.', ',')}</CardDescription>
                </div>
                <p>{props.stock}</p>
            </CardContent>
        </Card>
    );
}
