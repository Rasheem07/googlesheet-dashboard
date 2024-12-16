import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import { useTranslations } from "next-intl";

import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

const gentsKandoraSection = [
  "KANDORA NORMAL",
  "KANDORA SOOF",
  "KANDORA ITALY",
  "CUSTOMER FABRIC KANDORA",
  "SHAAL SADA",
  "SHAAL ZEGNA",
  "SHAAL ZENIA",
  "SHAAL+KANDORA PACKAGE",
];

const gentsItemsSection = [
  "AGAAL",
  "FANILA BOX",
  "FANILA BY PIECE'S",
  "GATRA",
  "JALABIYA BY PIECE",
  "JOLABIA PACKAGE",
  "MUDASSAR BY PIECE",
  "MUDASSAR PACKAGE",
  "MUDASSAR WITH SHORTS SET",
  "SHEMAGH",
  "SHEMAGH RED",
  "SHEMAGH WHITE",
  "SHEMAGH ZEGNA",
  "WAZAR BOX",
  "WAZAR BY PIECE'S",
  "CAP BY PIECE'S",
  "CAP BOX",
  "THARBOOSH",
  "ULTRETION",
];

const gentsJacketSection = ["WINTER JACKET", "STITCH COAT", "VEST JACKET"];

const juniorKidsSection = [
  "BISTH KID'S",
  "ERELIC 8 PIECE'S PACKAGE",
  "FLOWER'S EXTRA FOR PACKAGE",
  "HAMDANIA KID'S",
  "HOME 19 PIECE'S PACKAGE",
  "JOLABIA KID'S",
  "KANDORA KID'S",
  "MUGASSAR BY PIECE'S",
  "MUGASSAR KID'S",
  "SAFRA KID'S",
  "SGHA KID'S",
  "SHAAL KID'S",
  "SHAAL ZEGNA",
  "SMALL 13 PIECE'S PACKAGE",
  "WAZAR KID'S",
  "X SMALL 6 PIECE'S PACKAGE",
  "X SMALL EMPTY BOX",
  "X SMALL 4 PIECES SOOF PACKAGE",
  "X SMALL 5 PIECES PACKAGE",
];



export default function ProductListButton({}: Props) {
  const [options, setoptions] = useState<string[]>([]);
  const { ProductCategory } = useAnalyticsContext();
  
  const t = useTranslations("analytics");
  useEffect(() => {
    if (ProductCategory === "NUBRAS GENTS KANDORA SECTION") {
      setoptions(gentsKandoraSection);
    } else if (ProductCategory === "NUBRAS GENTS ITEM'S SECTION") {
      setoptions(gentsItemsSection);
    } else if (ProductCategory === "NUBRAS GENTS JACKET SECTION") {
      setoptions(gentsJacketSection);
    } else if (ProductCategory === "NUBRAS JUNIOR KID'S SECTION") {
      setoptions(juniorKidsSection);
    }
  }, [ProductCategory]);

  return (
    <Select disabled={ProductCategory == ""}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder={ProductCategory !== "" ? t("buttons.Product Lists") : t("buttons.Select a product category")} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: string, key: number) => (
          <SelectItem value={option} key={key}>
            {t(`buttons.${option}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
