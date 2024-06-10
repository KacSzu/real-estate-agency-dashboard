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
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { Form } from "@/components/ui/form";
import { FileState } from "@/components/ui/multi-image-dropzone";
import { BREADCRUMBS_PROPERTIES_NEW } from "@/lib/constants";
import { useEdgeStore } from "@/lib/edgestore";
import { NewPropertyFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ImSpinner } from "react-icons/im";
const DashboardPropertiesAddPage = () => {
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
    <section className="space-y-4 p-6 md:p-8">
      <DashboardSectionHeader
        breadcrumbs={BREADCRUMBS_PROPERTIES_NEW}
        title="Add property"
      />
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
            <DashboardPropertiesNewNumberBathroomsField
              control={form.control}
            />
            <DashboardPropertiesNewDescriptionField control={form.control} />
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button className="w-full sm:w-[300px]" type="submit">
              {isLoading ? (
                <ImSpinner className="animate-spin text-xl disabled:cursor-not-allowed" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default DashboardPropertiesAddPage;
