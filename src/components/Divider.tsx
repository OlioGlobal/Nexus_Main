import Image from 'next/image'

export default function Divider() {
  return (
    <div className="w-full overflow-hidden border-y border-[#CCCCCC] h-8 sm:h-10 md:h-14 lg:h-14">
      <Image
        src="/ui/Divider.svg"
        alt=""
        width={1360}
        height={50}
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
    </div>
  )
}
