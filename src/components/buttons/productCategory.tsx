import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAnalyticsContext } from "@/contexts/analyticsContext";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

const CategoryOptions = [
  "NUBRAS GENTS KANDORA SECTION",
  "NUBRAS GENTS ITEM'S SECTION",
  "NUBRAS GENTS JACKET SECTION",
  "NUBRAS JUNIOR KID'S SECTION",
];

function ProductCategoryButton({}: Props) {
  const { ProductCategory, setProductCategory } = useAnalyticsContext();
  const t = useTranslations('analytics') || { 'buttons': { 'default': 'Loading' } };

  // Memoize the CategoryOptions since it's constant
  const memoizedCategoryOptions = useMemo(() => CategoryOptions, []);

  return (
    <Select onValueChange={setProductCategory} value={ProductCategory}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Product categories" />
      </SelectTrigger>
      <SelectContent>
        {memoizedCategoryOptions.slice(0, 10).map((option: string, key: number) => (
          <SelectItem value={option} key={key}>
            {t(`buttons.${option}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default React.memo(ProductCategoryButton);