import { BorderTrail } from "@/components/ui/border-trail";

export default function GetStartedButton() {
  return (
    <div className="relative max-w-max">
      <button className="m-1 overflow-hidden rounded-md border border-zinc-950/10 bg-emerald-500 text-white hover:bg-emerald-600 group py-2.5 px-6 outline-none dark:border-zinc-50/20 dark:text-zinc-300">
        Get started for free
        <BorderTrail
          className="bg-gradient-to-l p-2 from-emerald-200 via-emerald-500 to-emerald-200 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-700 group-hover:from-emerald-600 group-hover:via-emerald-700 group-hover:to-emerald-800"
          size={90}
        />
      </button>
    </div>
  );
}
