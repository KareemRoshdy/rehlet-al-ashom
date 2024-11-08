"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "rsuite";

const formSchema = z.object({
  title: z.string().min(1, { message: "إسم الدورة مطلوب" }),
});

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses`, values);
      setIsLoading(false);

      router.push(`/admin/courses/${response.data.id}`);
      toast.success("تم إنشاء الدورة");
    } catch {
      setIsLoading(false);
      toast.error("حدث خطاء");
    }
  };

  return (
    <div className="max-w-5xl mx-auto  flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">إسم الدورة</h1>
        <p className="text-sm text-slate-600">
          ما الإسم الذي تود تسميته لدورتك؟ لا تقلق، يمكنك تغييره لاحقاً.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الدورة</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="مثال: تعلم التداول"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>ماذا ستعلّم في هذه الدورة؟</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/admin/courses">
                <Button type="button" variant="ghost">
                  إلغاء
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-x-2">
                    <Loader />
                    يتم الإنشاء
                  </div>
                ) : (
                  "إستمر"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
