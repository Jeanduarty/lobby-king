import { Matchup } from "@/components/Matchup";

export default async function Matches(context: any) {
  const slug = context.params.slug;

  return (
    <>
      <div
        className="h-full bg-[#141213]
         border-t border-[rgba(129,124,156,0.15)] flex items-center justify-center"
      >
        <Matchup slug={slug} />
      </div>
    </>
  );
}
