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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

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
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  useEffect(() => {
    const city = searchParams.get("city");
    const type = searchParams.get("type");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    if (city) setSelectedCity(city);
    if (type) setSelectedType(type);
    if (priceMin) setPriceMin(priceMin);
    if (priceMax) setPriceMax(priceMax);
  }, [searchParams]);

  const handleSearch = () => {
    const urlParams = new URLSearchParams();
    if (selectedCity) urlParams.set("city", selectedCity);
    if (selectedType) urlParams.set("type", selectedType);
    if (priceMin) urlParams.set("priceMin", priceMin);
    if (priceMax) urlParams.set("priceMax", priceMax);
    urlParams.set("page", "1");
    router.push(`?${urlParams.toString()}`);
  };

  const handleClear = () => {
    setSelectedCity(null);
    setSelectedType(null);
    setPriceMin("");
    setPriceMax("");
    router.push("?");
  };

  return (
    <div className="relative flex flex-col bg-muted md:flex-row justify-center md:justify-start items-center gap-3 border rounded-xl shadow-md p-4">
      <Image
        src="/svg/svg7.svg"
        alt="svg"
        width={450}
        height={450}
        className=" -left-40 -top-30 absolute  z-[-10]"
      />
      <Image
        src="/svg/svg6.svg"
        alt="svg"
        width={450}
        height={450}
        className=" hidden xl:block -top-20 -right-20 absolute  z-[-10]"
      />
      <div className="w-full space-y-1">
        <p className="text-sm font-semibold">Types</p>
        <Select value={selectedType || ""} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["Villa", "Home", "Flat"].map((str, i) => (
                <SelectItem key={i} value={str}>
                  {str}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full  space-y-1">
        <p className="text-sm font-semibold">Cities</p>
        <Select value={selectedCity || ""} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {cityCounts.map(({ city, count }) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <p className="text-sm font-semibold ">Price</p>
          <div className="flex gap-1 items-center">
            <Input
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <span>&mdash;</span>
            <Input
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 md:items-end md:w-auto">
        <Button className="w-full md:w-[150px]" onClick={handleSearch}>
          Search
        </Button>
        <Button
          variant="outline"
          className="w-full md:w-[150px]"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default memo(PropertiesFilters);
