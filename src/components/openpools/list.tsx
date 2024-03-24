import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
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
  const [isExpand, setIsExpand] = useState(false);
  const setFrom = from as CoinList;
  const setTo = to as CoinList;
  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-light-dark shadow-card transition-all last:mb-0 hover:shadow-large">
      <div
        onClick={() => setIsExpand(!isExpand)}
        className="relative grid h-auto cursor-pointer grid-cols-6 items-center gap-3 py-4 sm:h-20 sm:gap-6 sm:py-0"
      >
        <div className="col-span-2 px-4">
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
      <AnimatePresence initial={false}>
        {isExpand && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="grid grid-cols-2 gap-4 border-t border-dashed border-gray-700 px-4 py-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 text-sm xl:text-base 3xl:text-lg">
                  <div>USDT staked: </div>
                  <div className="font-semibold">$ 200</div>
                </div>
                <div className="flex w-full gap-2">
                  <Input type="number" value={0} className="w-full" />
                  <Button shape="rounded" color="info">
                    Stake USDT
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 text-sm xl:text-base 3xl:text-lg">
                  <div>USDC staked: </div>
                  <div className="font-semibold">$ 250</div>
                </div>
                <div className="flex w-full gap-2">
                  <Input type="number" value={0} className="w-full" />
                  <Button shape="rounded" color="info">
                    Stake USDC
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmList;
