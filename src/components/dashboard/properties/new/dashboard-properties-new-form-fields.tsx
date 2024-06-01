import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { NewPropertyFormSchema } from "@/lib/schema";

interface FormFieldProps {
  control: Control<z.infer<typeof NewPropertyFormSchema>>;
}

const DashboardPropertiesNewTitleField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

const DashboardPropertiesNewTypeField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

const DashboardPropertiesNewCountryField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

const DashboardPropertiesNewCityField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

const DashboardPropertiesNewPriceField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

const DashboardPropertiesNewNumberBedroomsField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

const DashboardPropertiesNewNumberBathroomsField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
    name="numberBathrooms"
    render={({ field }) => (
      <FormItem className="flex flex-col gap-1 col-span-12 md:col-span-4">
        <FormLabel>Number of Bathrooms</FormLabel>
        <FormControl>
          <Input placeholder="For instance 1" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const DashboardPropertiesNewDescriptionField: React.FC<FormFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
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
);

export {
  DashboardPropertiesNewTitleField,
  DashboardPropertiesNewTypeField,
  DashboardPropertiesNewCountryField,
  DashboardPropertiesNewCityField,
  DashboardPropertiesNewPriceField,
  DashboardPropertiesNewNumberBedroomsField,
  DashboardPropertiesNewNumberBathroomsField,
  DashboardPropertiesNewDescriptionField,
};
