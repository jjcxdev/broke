export default function WeekCard() {
  return (
    <div className="h-fit w-full rounded-lg bg-black">
      <div className="p-4 py-2">
        <h2 className="text-3xl text-white">Week 1</h2>
        <div className="flex flex-row gap-2">
          <div className="w-fit rounded-md bg-neutral-700 px-2 py-1 text-xs text-white">
            $0 Justin
          </div>
          <div className="w-fit rounded-md bg-neutral-400 px-2 py-1 text-xs text-white">
            $158 Karen
          </div>
        </div>
      </div>
    </div>
  );
}
