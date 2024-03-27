import { MyNav } from "@/components/nav/MyNav";
import { ListProducts } from "@/components/listProducts/ListProducts";
import { ModalProduct } from "@/components/modal/ModalProduct";
import { NoDATA } from "@/components/status/NoData";
import { useProductData } from "@/hooks/useProductData";

export function HomePage() {
    const { data } = useProductData();
    return (
        <>
            <MyNav />
            <div className="flex-1 space-y-4 p-4 lg:px-8 pt-6 justify-center">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <div className="flex items-center space-x-2">
                        <ModalProduct initialValues={null} />
                    </div>
                </div>
                {
                    data?.length === 0 ?
                        <div className="flex items-center justify-center h-[calc(100vh-25rem)]">
                            <NoDATA />
                        </div>
                        : <ListProducts />
                }

            </div>
        </>
    )
}