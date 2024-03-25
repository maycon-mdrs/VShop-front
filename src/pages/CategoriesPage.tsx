import { MyNav } from "@/components/nav/MyNav";
import { ListCategories } from "@/components/listCategories/ListCategories";
import { ModalNewCategory } from "@/components/modal/ModalNewCategory";

export function CategoriesPage() {
    return (
        <>
            <MyNav />
            <div className="flex-1 space-y-4 p-4 lg:px-8 pt-6 justify-center">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                    <div className="flex items-center space-x-2">
                        <ModalNewCategory />
                    </div>
                </div>
                <ListCategories />
            </div>
        </>
    )
}