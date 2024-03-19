import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import TransactionInfo from '@/components/ui/transaction-info';

interface FarmListTypes {
  from: string;
  to: string;
  earned: string;
  apr: string;
  liquidity: string;
  multiplier: string;
}

const FarmList: React.FC<FarmListTypes> = ({
  from,
  to,
  earned,
  apr,
  liquidity,
  multiplier,
}) => {
  const setFrom = from as CoinList;
  const setTo = to as CoinList;
  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-light-dark shadow-card transition-all last:mb-0 hover:shadow-large">
      <div className="relative grid h-auto cursor-pointer grid-cols-5 items-center gap-3 py-4 sm:h-20 sm:gap-6 sm:py-0">
        <div className="col-span-2 px-4 sm:col-auto xl:px-4">
          <CurrencySwapIcons from={setFrom} to={setTo} />
        </div>
        <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
          {earned}
        </div>
        <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
          {apr}
        </div>
        <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
          {liquidity}
        </div>
        <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
          {multiplier}
        </div>
      </div>
    </div>
  );
};

export default FarmList;
