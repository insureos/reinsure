import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import cn from 'classnames';
import VotePoll from '@/components/open-policies/vote-poll';
import VoterTable from '@/components/open-policies/voter-table';
import { getVotesByStatus } from '@/data/static/vote-data';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';

interface SupportBidProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunc: () => void;
}

const SupportBid: React.FC<SupportBidProps> = ({ setIsOpen, submitFunc }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
      <div className="flex h-[20rem] w-[32rem] flex-col justify-between rounded-[1.5rem] bg-gray-900 p-8 pt-5 shadow-xl">
        <div className="flex w-full justify-between">
          <div></div>
          <XMarkIcon className="h-8 w-8" onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
};

interface CreateBidProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunc: () => void;
}

const CreateBid: React.FC<CreateBidProps> = ({ setIsOpen, submitFunc }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
      <div className="flex h-[25rem] w-[35rem] flex-col justify-between rounded-[1.5rem] bg-gray-900 p-8 pt-5 shadow-xl">
        <div className="flex w-full justify-between">
          <div className="text-base xl:text-lg 3xl:text-xl font-semibold">Create Bid</div>
          <XMarkIcon className="h-8 w-8" onClick={() => setIsOpen(false)} />
        </div>
        <Input
          type="number"
          placeholder="enter commission"
          label="Commission ( in % )"
        />
        <Textarea
          placeholder="policy payout details"
          label="Policy Payout Details"
        />
        <Button shape="rounded" size="small">
          Submit
        </Button>
      </div>
    </div>
  );
};

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
  const [supportBidModal, setSupportBidModal] = useState(false);
  const [createBidModal, setCreateBidModal] = useState(false);

  useLockBodyScroll(supportBidModal || createBidModal);

  return (
    <>
      {supportBidModal && (
        <SupportBid setIsOpen={setSupportBidModal} submitFunc={() => {}} />
      )}
      {createBidModal && (
        <CreateBid setIsOpen={setCreateBidModal} submitFunc={() => {}} />
      )}

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
                  Current Leading Bid : PoolAddress (Size: ,Leverage:
                  ,Consensus: )
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    shape="rounded"
                    color="success"
                    className="flex-1 xs:flex-auto"
                    size="small"
                    onClick={() => setSupportBidModal(true)}
                  >
                    Support Bid
                  </Button>
                  <Button
                    shape="rounded"
                    color="danger"
                    className="flex-1 xs:flex-auto"
                    size="small"
                    onClick={() => setCreateBidModal(true)}
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
    </>
  );
};

export default FarmList;
