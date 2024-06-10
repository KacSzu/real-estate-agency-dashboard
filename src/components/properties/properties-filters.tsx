"use client";
import { memo, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { HiXMark } from "react-icons/hi2";

interface IPropertiesFiltersProps {
  cityCounts: {
    city: string;
    count: number;
  }[];
}

function PropertiesFilters({ cityCounts }: IPropertiesFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const city = searchParams.get("city");
    const type = searchParams.get("type");
    if (city) setSelectedCity(city);
    if (type) setSelectedType(type);
  }, [searchParams]);

  const handleParamChange = (param: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(param, value);
    router.push(`?${params.toString()}`);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    handleParamChange("city", city);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    handleParamChange("type", type);
  };
  const resetCity = () => {
    setSelectedCity(null);
    handleParamChange("city", "");
  };

  const resetType = () => {
    setSelectedType(null);
    handleParamChange("type", "");
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3">
      <div className="flex gap-1 items-center">
        <HiXMark
          className="cursor-pointer flex-start mr-2 h-5 w-5"
          onClick={resetCity}
        />
        <Select value={selectedCity || ""} onValueChange={handleCityChange}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cities</SelectLabel>
              {cityCounts.map(({ city, count }) => (
                <SelectItem key={city} value={city}>
                  {city} &#40;{count}&#41;
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-1 items-center">
        <HiXMark
          className="cursor-pointer flex-start mr-2 h-5 w-5"
          onClick={resetType}
        />
        <Select value={selectedType || ""} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              {["Villa", "Home", "Flat"].map((str, i) => (
                <SelectItem key={i} value={str}>
                  {str}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default memo(PropertiesFilters);
