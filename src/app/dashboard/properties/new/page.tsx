"use client";
import { Button } from "@/components/ui/button";
import DashboardBreadcrumbs from "@/components/ui/dashboard-breadcrumb";
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
import {
  FileState,
  MultiImageDropzone,
} from "@/components/ui/multi-image-dropzone";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BREADCRUMBS_PROPERTIES_NEW } from "@/lib/constants";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
  city: z.string().min(1, { message: "City is required" }),
  title: z.string().min(2, { message: "Title is required" }),
  type: z.enum(["Villa", "Home", "Flat"], { message: "Type is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  numberBedrooms: z.string().min(1, { message: "Number bedrooms is required" }),
  numberBathrooms: z
    .string()
    .min(1, { message: "Number bathrooms is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const DashboardPropertiesAddPage = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [imageUrls, setImageUrls] = useState<
    {
      imageSrc: string;
      thumbnailSrc: string | null;
    }[]
  >([]);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  function addImage(res: {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
  }) {
    setImageUrls((prevImageUrls) => [
      ...prevImageUrls,
      {
        imageSrc: res.url,
        thumbnailSrc: res.thumbnailUrl,
      },
    ]);
  }

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const formValues = { ...values, files: imageUrls };
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      router.push("/dashboard/properties");
      form.reset();
      toast.success("Property created.");
    }
    console.log(data);
  }

  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardBreadcrumbs breadcrumbs={BREADCRUMBS_PROPERTIES_NEW} />
      <div className="flex justify-between pb-2 border-b">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-4xl font-bold tracking-tight">Add property</h2>
          <p className="text-muted-foreground text-sm">Add a new property</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 justify-center">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <MultiImageDropzone
                    value={fileStates}
                    dropzoneOptions={{
                      maxFiles: 6,
                    }}
                    onChange={(files) => {
                      setFileStates(files);
                    }}
                    onFilesAdded={async (addedFiles) => {
                      setFileStates([...fileStates, ...addedFiles]);
                      await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                          try {
                            const res = await edgestore.realEstateImages.upload(
                              {
                                file: addedFileState.file as File,
                                options: {
                                  temporary: true,
                                },
                                onProgressChange: async (progress) => {
                                  updateFileProgress(
                                    addedFileState.key,
                                    progress
                                  );
                                  if (progress === 100) {
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    updateFileProgress(
                                      addedFileState.key,
                                      "COMPLETE"
                                    );
                                  }
                                },
                              }
                            );
                            addImage(res);
                          } catch (err) {
                            updateFileProgress(addedFileState.key, "ERROR");
                          }
                        })
                      );
                    }}
                  />
                </FormControl>
                <FormDescription className="text-muted-foreground">
                  Images have to be jpg, png, jpeg, webp.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 grid-cols-12">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Villa in Marbella" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-4">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Types</SelectLabel>
                          <SelectItem value="Villa">Villa</SelectItem>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Flat">Flat</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-4">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Poland" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-4">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Wrocław" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-4">
                  <FormLabel>Price in EUR</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberBedrooms"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-4">
                  <FormLabel>Number of Bedrooms</FormLabel>
                  <FormControl>
                    <Input placeholder="For instance 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberBathrooms"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1  col-span-12 md:col-span-4">
                  <FormLabel>Number of Bathrooms</FormLabel>
                  <FormControl>
                    <Input placeholder="For instance 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center col-span-12 md:col-span-8">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the property" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button className="w-full sm:w-[500px]" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default DashboardPropertiesAddPage;
