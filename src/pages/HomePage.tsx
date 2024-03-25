import { MyNav } from "@/components/nav/MyNav";
import { Button } from "@/components/ui/button";
import { ListProducts } from "@/components/listProducts/ListProducts";
import { ModalNewProduct } from "@/components/modal/ModalNewProduct";

export function HomePage() {

    return (
        <>
            <MyNav />
            <div className="flex-1 space-y-4 p-4 lg:px-8 pt-6 justify-center">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <div className="flex items-center space-x-2">
                        <ModalNewProduct />
                    </div>
                </div>
                <ListProducts />
            </div>
        </>
    )
}