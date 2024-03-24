import Button from '@/components/ui/button';
import FarmList from '@/components/risk-mitigation/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

export default function RiskMitigation() {
  return (
    <div className="mx-auto w-full">
      <div className="test-xs mb-3 grid grid-cols-6 gap-6 rounded-lg bg-light-dark font-semibold shadow-card xl:text-sm 3xl:text-base">
        <span className="col-span-2 px-6 py-6 tracking-wider text-gray-300">
          Insurance Policy
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Underlying Pool
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Capital Deployed
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Payouts
        </span>
        <span className="px-4 py-6 tracking-wider text-center text-gray-300">
          APR
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
