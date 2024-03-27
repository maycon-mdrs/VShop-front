import { MyNav } from "@/components/nav/MyNav";
import { ListCategories } from "@/components/listCategories/ListCategories";
import { ModalCategory } from "@/components/modal/ModalCategory";
import { NoDATA } from "@/components/status/NoData";
import { useCategoryData } from "@/hooks/useCategoryData";

export function CategoriesPage() {
    const { data } = useCategoryData();
    return (
        <>
            <MyNav />
            <div className="flex-1 space-y-4 p-4 lg:px-8 pt-6 justify-center">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                    <div className="flex items-center space-x-2">
                        <ModalCategory initialValues={null} />
                    </div>
                </div>
                {
                    data?.length === 0 ?
                        <div className="flex items-center justify-center h-[calc(100vh-25rem)]">
                            <NoDATA />
                        </div>
                        : <ListCategories />
                }
            </div>
        </>
    )
}