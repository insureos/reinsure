import Button from '@/components/ui/button';
import FarmList from '@/components/openpools/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';

export default function OpenPools() {
  return (
    <div className="mx-auto w-full">
      <div className="test-xs mb-3 grid grid-cols-5 font-semibold gap-6 rounded-lg bg-light-dark shadow-card xl:text-sm 3xl:text-base">
        <span className="px-6 py-6 tracking-wider text-gray-300">Pool Name</span>
        <span className="px-6 py-6 tracking-wider text-gray-300 text-center">Target Pool Size</span>
        <span className="px-6 py-6 tracking-wider text-gray-300 text-center">Current Pool Size</span>
        <span className="px-6 py-6 tracking-wider text-gray-300 text-center">
          Over Capitalization ratio
        </span>
        <span className="px-4 py-6 tracking-wider text-gray-300">
          Pool Lifecycle
        </span>
      </div>

      {FarmsData.map((farm) => (
        <FarmList
          key={farm.id}
          from={farm.from}
          to={farm.to}
          earned={farm.earned}
          apr={farm.apr}
          liquidity={farm.liquidity}
          multiplier={farm.multiplier}
        />
      ))}
    </div>
  );
}
