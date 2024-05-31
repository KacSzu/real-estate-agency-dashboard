"use client";
import { edgeStoreRouter } from "@/app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";
export const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<edgeStoreRouter>();
