import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import { StaticImageData } from 'next/image';

type OracleCardProps = {
  data: any;
};

export default function OracleCard({ data }: OracleCardProps) {
  return (
    <div
      // href="/insurance-risk/details"
      className="relative flex h-[10rem] w-full justify-between overflow-hidden rounded-lg border border-gray-800 bg-light-dark p-3 px-3 shadow-card transition-all duration-200 hover:shadow-large"
    >
      <div className="flex h-full w-[75%] flex-col justify-between">
        <div className="flex flex-col gap-5">
          <div className="text-wrap text-sm xl:text-base 3xl:text-lg">
            {data.name}
          </div>
          <div className="text-3xs xl:text-2xs 3xl:text-xs">{data.address}</div>
        </div>
        <div className="text-sm xl:text-base 3xl:text-lg">
          {data.value} (-5% since 1hr)
        </div>
      </div>
      <div className="flex h-fit w-[24%] items-center justify-center rounded-lg bg-brand py-2 text-2xs font-semibold shadow-inner shadow-[rgba(0,0,0,0.3)] xl:text-xs 3xl:text-sm">
        1 min ago
      </div>
    </div>
  );
}
