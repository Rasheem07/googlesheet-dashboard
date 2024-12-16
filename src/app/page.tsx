'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {};

export default function Page({}: Props) {
  const router = useRouter();

  useEffect(() => {
    router.push("/en");
  }, [router]);

  return null; // Return null to prevent rendering anything
}
