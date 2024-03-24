import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import TransactionInfo from '@/components/ui/transaction-info';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';

import { NFTList } from '@/data/static/nft-list';
import NFTGrid from '@/components/ui/nft-card';

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
            <div className="flex w-full flex-col gap-4 border-t border-dashed border-gray-700 px-4 py-4">
              <div className="grid w-full auto-cols-min grid-flow-col grid-cols-3 overflow-x-auto pb-3">
                {NFTList.map((nft) => (
                  <div key={nft.id} className="px-3">
                    <NFTGrid
                      name={nft.name}
                      image={nft.image}
                      author={nft.author}
                      authorImage={nft.authorImage}
                      price={nft.price}
                      collection={nft.collection}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex w-full items-center justify-center gap-2">
                <Button shape="rounded" size="small" className="w-1/2">
                  Active Mitigation Strategies
                </Button>
                <Button
                  shape="rounded"
                  size="small"
                  className="w-1/2"
                  color="success"
                >
                  Deploy Mitigation Strategies
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmList;
