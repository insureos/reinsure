import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import TransactionInfo from '@/components/ui/transaction-info';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import cn from 'classnames';
import VotePoll from '@/components/open-policies/vote-poll';
import VoterTable from '@/components/open-policies/voter-table';
import { getVotesByStatus } from '@/data/static/vote-data';

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
  const { votes, totalVote } = getVotesByStatus('active');

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-light-dark shadow-card transition-all last:mb-0 hover:shadow-large">
      <div
        onClick={() => setIsExpand(!isExpand)}
        className="relative grid h-auto cursor-pointer grid-cols-7 items-center gap-3 py-4 sm:h-20 sm:gap-6 sm:py-0"
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
            <div className="mb-6 flex w-full items-center justify-between border-y border-dashed border-gray-700 px-4 py-6 text-gray-400">
              <div className="text-sm xl:text-base 3xl:text-lg">
                Current Leading Bid : PoolAddress (Size: ,Leverage: ,Consensus:
                )
              </div>
              <div className="flex items-center gap-3">
                <Button
                  shape="rounded"
                  color="success"
                  className="flex-1 xs:flex-auto"
                  size="small"
                >
                  Support Bid
                </Button>
                <Button
                  shape="rounded"
                  color="danger"
                  className="flex-1 xs:flex-auto"
                  size="small"
                >
                  Create Bid
                </Button>
              </div>
            </div>
            <VotePoll
              accepted={votes[0]?.accepted}
              rejected={votes[0]?.rejected}
            />
            <VoterTable votes={votes[0]?.votes as any} />
            <div className="mb-4 flex w-full items-center justify-center">
              <Button
                shape="rounded"
                fullWidth={true}
                size="small"
                onClick={() => setIsExpand(!isExpand)}
                className={cn('sm:w-4/6 md:w-3/6 xl:w-2/6')}
              >
                Collapse
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmList;
