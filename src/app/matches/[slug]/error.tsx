"use client"; // Error components must be Client components

export default function Error() {
  return (
    <div
      className="bg-[#141213] h-full w-full flex items-center justify-center rounded-br-2xl 
    border-t border-[rgba(129,124,156,0.15)]"
    >
      <span className="border-r border-[#EEE] text-2xl pr-4 text-[#EEE]">
        400
      </span>
      <span className="text-sm pl-4 text-[#EEE]">
        This match could not be found.
      </span>
    </div>
  );
}
