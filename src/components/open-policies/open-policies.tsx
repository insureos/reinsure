import Button from '@/components/ui/button';
import FarmList from '@/components/open-policies/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

export default function OpenPolicies() {
  return (
    <div className="mx-auto w-full">
      <div className="test-xs mb-3 grid grid-cols-7 gap-6 rounded-lg bg-light-dark font-semibold shadow-card xl:text-sm 3xl:text-base">
        <span className="col-span-2 px-6 py-6 tracking-wider text-gray-300">
          Insuree Name
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Coverage Amount
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Premium Paid Up
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Maximum Leverage
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Active Bids
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Latest Deductible
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
