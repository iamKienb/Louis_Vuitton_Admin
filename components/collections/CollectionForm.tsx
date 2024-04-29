import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../customs/ImageUpload";
import { useRouter } from "next/navigation";
import { CollectionType } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  image: z.string(),
  path: z.string().min(2).max(50)
});
interface CollectionFormProps {
  initialData?: CollectionType  | null; //Must have "?" to make it optional
}
const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          // nếu có dữ liệu thì truyền vào ở dưới
          title: "",
          description: "",
          image: "",
          path:"",
        },
  });

  const handlePressEnter = (e:React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) =>{
    if(e.key === "Enter"){
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      console.log(values);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (err) {
      console.log("[collections_POST]", err);
    }
  };


  return (
    <div className="p-10">
      {initialData ? (
        <p className="text-heading2-bold">Edit Collection</p>
        
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* define form title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} onKeyDown={handlePressEnter} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* define form desc */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} rows={5}  onKeyDown={handlePressEnter}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* define image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={(url) => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Path</FormLabel>
                  <FormControl>
                    <Input placeholder="Path" {...field} onKeyDown={handlePressEnter} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-10">
              <Button type="submit" className="bg-blue-1 text-white">
                Submit
              </Button>
              <Button
                type="button"
                className="bg-blue-1 text-white"
                onClick={() => router.push("/collections")}
              >
                Discard
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CollectionForm;
