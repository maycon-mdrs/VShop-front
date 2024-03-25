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
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/ICategory";
import { Textarea } from "@/components/ui/textarea";

import { IProduct } from "@/interfaces/IProduct";
import { createProduct } from "@/services/ProductService";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useProductMutate } from "@/hooks/useProductData";

const formSchema = z.object({
    title: z.string({
        required_error: "Please enter a title."
    }).min(2, {
        message: "Title must be at least 2 characters.",
    }).max(100, {
        message: "Title must be at most 100 characters.",
    }),

    image: z.string({
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

    category: z.string({
        required_error: "Please select a category.",
    }),
})

export function FormsNewProduct({ handleClose }: { handleClose: () => void }){
    const categories = useCategoryData().data;
    const { mutate, isSuccess } = useProductMutate();

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: any) => {
        const data: IProduct = {
            name: values.title,
            description: values.description,
            imageUrl: values.image,
            price: parseFloat(values.price.replace(',', '.')),
            stock: parseInt(values.stock),
            categoryId: parseInt(values.category),
        }

        mutate(data);
    }

    useEffect(() => {
        handleClose();
    }, [isSuccess])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
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
                    name="image"
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
                    name="category"
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

                <Button type="submit" className="w-full">Add</Button>
            </form>
        </Form>
    )
}
