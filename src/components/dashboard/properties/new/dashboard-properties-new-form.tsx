"use client";
import DashboardPropertiesNewDropzone from "@/components/dashboard/properties/new/dashboard-properties-new-dropzone";
import {
  DashboardPropertiesNewCityField,
  DashboardPropertiesNewCountryField,
  DashboardPropertiesNewDescriptionField,
  DashboardPropertiesNewNumberBathroomsField,
  DashboardPropertiesNewNumberBedroomsField,
  DashboardPropertiesNewPriceField,
  DashboardPropertiesNewTitleField,
  DashboardPropertiesNewTypeField,
} from "@/components/dashboard/properties/new/dashboard-properties-new-form-fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ImSpinner } from "react-icons/im";
import { FileState } from "@/components/ui/multi-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { NewPropertyFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function DashboardPropertiesNewForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const [imageUrls, setImageUrls] = useState<
    {
      imageSrc: string;
      thumbnailSrc: string | null;
    }[]
  >([]);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof NewPropertyFormSchema>>({
    resolver: zodResolver(NewPropertyFormSchema),
  });

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

  async function onSubmit(values: z.infer<typeof NewPropertyFormSchema>) {
    const formValues = { ...values, files: imageUrls };
    setIsLoading(true);
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await res.json();

    if (data.error) {
      setIsLoading(false);
      toast.error(data.error);
    } else {
      setIsLoading(false);
      router.push("/dashboard/properties");
      router.refresh();
      form.reset();
      toast.success("Property created.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border-t pt-2"
      >
        <DashboardPropertiesNewDropzone
          form={form}
          fileStates={fileStates}
          setFileStates={setFileStates}
          edgestore={edgestore}
          addImage={addImage}
        />
        <div className="grid gap-4 grid-cols-12">
          <DashboardPropertiesNewTitleField control={form.control} />
          <DashboardPropertiesNewTypeField control={form.control} />
          <DashboardPropertiesNewCountryField control={form.control} />
          <DashboardPropertiesNewCityField control={form.control} />
          <DashboardPropertiesNewPriceField control={form.control} />
          <DashboardPropertiesNewNumberBedroomsField control={form.control} />
          <DashboardPropertiesNewNumberBathroomsField control={form.control} />
          <DashboardPropertiesNewDescriptionField control={form.control} />
        </div>
        <div className="flex justify-center sm:justify-end">
          <Button
            disabled={isLoading}
            className="w-full sm:w-[300px] disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? (
              <ImSpinner className="animate-spin text-xl " />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DashboardPropertiesNewForm;
