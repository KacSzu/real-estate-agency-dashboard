import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  MultiImageDropzone,
  FileState,
} from "@/components/ui/multi-image-dropzone";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewPropertyFormSchema } from "@/lib/schema";

interface DashboardPropertiesNewDropzoneProps {
  form: ReturnType<typeof useForm<z.infer<typeof NewPropertyFormSchema>>>;
  fileStates: FileState[];
  setFileStates: Dispatch<SetStateAction<FileState[]>>;
  edgestore: any;
  addImage(res: {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
  }): void;
}

const DashboardPropertiesNewDropzone: React.FC<
  DashboardPropertiesNewDropzoneProps
> = ({ form, fileStates, setFileStates, edgestore, addImage }) => {
  const updateFileProgress = useCallback(
    (key: string, progress: FileState["progress"]) => {
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
    },
    [setFileStates]
  );

  const handleFilesAdded = useCallback(
    async (addedFiles: FileState[]) => {
      setFileStates((prevFileStates) => [...prevFileStates, ...addedFiles]);
      await Promise.all(
        addedFiles.map(async (addedFileState) => {
          try {
            const res = await edgestore.realEstateImages.upload({
              file: addedFileState.file as File,
              onProgressChange: async (progress: any) => {
                updateFileProgress(addedFileState.key, progress);
                if (progress === 100) {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  updateFileProgress(addedFileState.key, "COMPLETE");
                }
              },
            });
            addImage(res);
          } catch (err) {
            updateFileProgress(addedFileState.key, "ERROR");
          }
        })
      );
    },
    [edgestore, addImage, setFileStates, updateFileProgress]
  );

  return (
    <FormField
      control={form.control}
      name="files"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1 justify-center">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <MultiImageDropzone
              value={fileStates}
              dropzoneOptions={{ maxFiles: 6 }}
              onChange={(files) => setFileStates(files)}
              onFilesAdded={handleFilesAdded}
            />
          </FormControl>
          <FormDescription className="text-muted-foreground">
            Images have to be jpg, png, jpeg, webp.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default React.memo(DashboardPropertiesNewDropzone);
