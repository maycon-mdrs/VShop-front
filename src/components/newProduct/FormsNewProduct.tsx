import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { ICategory } from "@/interfaces/ICategory";
import { Textarea } from "@/components/ui/textarea";

import { IProduct } from "@/interfaces/IProduct";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useProductMutate, useProductUpdate } from "@/hooks/useProductData";

const formSchema = z.object({
    name: z.string({
        required_error: "Please enter a title."
    }).min(3, {
        message: "Title must be at least 2 characters.",
    }).max(100, {
        message: "Title must be at most 100 characters.",
    }),

    imageUrl: z.string({
        required_error: "Please enter a image URL."
    }).max(255, {
        message: "Image URL must be at most 255 characters.",
    }),

    price: z.string({
        required_error: "Please enter a price."
    }).min(0, {
        message: "Price must be at least 0.",
    }),

    stock: z.string({
        required_error: "Please enter a stock."
    }).min(0, {
        message: "Stock must be at least 0.",
    }),

    categoryId: z.string({
        required_error: "Please select a category.",
    }),
})

export function FormsNewProduct({ handleClose, initialValues = {} }: { handleClose: () => void, initialValues: Partial<IProduct> | null }) {
    const { mutate, isSuccess } = useProductMutate();
    const { mutate: updateProduct, isSuccess: isSuccessUpdate } = useProductUpdate();
    const { data: categories } = useCategoryData();

    const data = {
        name: initialValues?.name,
        description: initialValues?.description,
        imageUrl: initialValues?.imageUrl,
        price: initialValues?.price?.toString(),
        stock: initialValues?.stock?.toString(),
        categoryId: initialValues?.categoryId?.toString(),
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    })

    const onSubmit = async (values: any) => {
        const data: IProduct = {
            name: values.name,
            description: values.description,
            imageUrl: values.imageUrl,
            price: parseFloat(values.price.replace(',', '.')),
            stock: parseInt(values.stock),
            categoryId: parseInt(values.categoryId),
        }

        if (initialValues && initialValues.id) {
            updateProduct({ ...data, id: initialValues.id });
        } else {
            mutate(data);
        }
    }

    useEffect(() => {
        handleClose();
    }, [isSuccess, isSuccessUpdate])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type the description product here." id="message" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between gap-2">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories?.map((category: ICategory, index) => (
                                        <SelectItem key={index} value={category.categoryId!.toString()}>{category.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {initialValues ? 'Save' : 'Add'}
                </Button>
            </form>
        </Form>
    )
}
