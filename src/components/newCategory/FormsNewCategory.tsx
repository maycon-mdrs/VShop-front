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

import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { ICategory } from "@/interfaces/ICategory";

import { useCategoryMutate, useCategoryUpdate } from "@/hooks/useCategoryData";

const formSchema = z.object({
    name: z.string({
        required_error: "Please enter a name."
    }).min(1, {
        message: "Name must be at least 2 characters.",
    }).max(100, {
        message: "Name must be at most 100 characters.",
    }),
})

export function FormsNewCategory({ handleClose, initialValues = {} }: { handleClose: () => void, initialValues: Partial<ICategory> }) {
    const { mutate, isSuccess } = useCategoryMutate();
    const { mutate: mutateUpdate, isSuccess: isSuccessUpdate }  = useCategoryUpdate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    const onSubmit = async (values: any) => {
        const data: ICategory = {
            name: values.name,
        }

        if (initialValues && initialValues.categoryId) {
            mutateUpdate({ ...data, categoryId: initialValues.categoryId });
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

                <Button type="submit" className="w-full">{ initialValues ? 'Save' : 'Add' }</Button>
            </form>
        </Form>
    )
}