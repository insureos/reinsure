import { useState, useEffect } from 'react';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import cn from 'classnames';
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { getLpTokenBalance } from '@/lib/helpers/contract-interact';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import AnchorLink from '../ui/links/anchor-link';

interface DropdownProps {
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  Options: any[];
  placeholder?: string;
  type: number;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  active,
  setActive,
  Options,
  placeholder = 'select',
  type = 1,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChoose = (option: any) => {
    setActive(option);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-[15rem]', className)}>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#171E2E] px-6 py-3 text-xs hover:scale-[1.01] xl:text-sm 3xl:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        {type === 1 && (
          <div>{active !== null ? active.pool_name : placeholder}</div>
        )}
        {type === 2 && (
          <div>
            {active !== null
              ? `Commission ${
                  active?.proposed_commision
                }% , Undercollateralization ${
                  active?.proposed_undercollaterization
                }% , pubkey = ${active?.proposal_pubkey.slice(
                  0,
                  5
                )}...${active?.proposal_pubkey.slice(27, 32)} `
              : placeholder}
          </div>
        )}
        <ChevronDownIcon
          className={cn('h-5 w-5 transition-all', isOpen ? 'rotate-180' : '')}
        />
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute left-0 top-[115%] z-[10] flex w-[15rem] flex-col rounded-lg bg-gray-800 px-1 shadow-xl',
            className
          )}
        >
          {Options.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleChoose(item)}
                className="my-1 flex w-full cursor-pointer items-center justify-between rounded-lg px-6 py-2 text-xs hover:bg-gray-900 xl:text-sm 3xl:text-base"
              >
                {type === 1 && (
                  <>
                    {item.pool_name}
                    {active !== null &&
                      active.pool_pubkey === item.pool_pubkey && (
                        <CheckIcon className="h-5 w-5" />
                      )}
                  </>
                )}
                {type === 2 && (
                  <>
                    {`Commission ${
                      item.proposed_commision
                    }% , Undercollateralization ${
                      item.proposed_undercollaterization
                    }% , pubkey = ${item.proposal_pubkey.slice(
                      0,
                      5
                    )}...${item.proposal_pubkey.slice(27, 32)} `}
                    {active !== null &&
                      active.proposal_pubkey === item.proposal_pubkey && (
                        <CheckIcon className="h-5 w-5" />
                      )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface SupportBidProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunc: any;
  proposalPools: any[];
  proposals: any[];
}

const SupportBid: React.FC<SupportBidProps> = ({
  setIsOpen,
  submitFunc,
  proposals,
  proposalPools,
}) => {
  const [currPool, setCurrPool] = useState<any>(null);
  const [currProposal, setCurrProposal] = useState<any>(null);
  const [filProposals, setFilProposals] = useState<any[]>([]);

  const [status, setStatus] = useState(true);
  const [balance, setBalance] = useState(0);
  const [voteAmt, setVoteAmt] = useState(0);

  const wallet = useWallet();

  const getTokenAccBal = async () => {
    if (wallet.publicKey === null || currPool === null) return;
    await getLpTokenBalance(
      wallet.publicKey,
      new PublicKey(currPool.pool_pubkey)
    )
      .then((res: any) => {
        const bal = res.amount / 10 ** res.decimals;
        setBalance(bal);
      })
      .catch((e) => console.log(e));
  };

  const filterer = () => {
    const fils = proposals.filter(
      (item) => item.lp.pool_pubkey === currPool.pool_pubkey
    );
    setFilProposals(fils);
  };

  useEffect(() => {
    if (currPool === null) return;
    // const curr = proposals.find(
    //   (item: any) => item.lp.pool_pubkey === currPool.pool_pubkey
    // );
    filterer();
    getTokenAccBal();
    setStatus(true);
  }, [currPool]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
      <div className="flex h-[38rem] w-[45rem] flex-col justify-between gap-3 rounded-[1.5rem] bg-gray-900 p-8 pt-5 shadow-xl">
        <div className="flex w-full justify-between">
          <div className="text-base font-semibold xl:text-lg 3xl:text-xl">
            Support Bid
          </div>
          <XMarkIcon className="h-8 w-8" onClick={() => setIsOpen(false)} />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Select Pool
          </div>
          <Dropdown
            active={currPool}
            setActive={setCurrPool}
            Options={proposalPools}
            placeholder="Choose Pool"
            type={1}
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Select Proposal
          </div>
          <Dropdown
            active={currProposal}
            setActive={setCurrProposal}
            Options={filProposals}
            placeholder="Choose Proposal"
            type={2}
            className="w-[35rem]"
          />
        </div>
        {currProposal == null && (
          <div className="my-4 flex h-full w-full items-center justify-center rounded-xl border border-gray-400 p-4 text-base xl:text-lg 3xl:text-xl">
            Choose Pool to view proposal details
          </div>
        )}
        {currProposal !== null && (
          <div className="my-4 flex h-full w-full flex-col justify-between rounded-xl border border-gray-400 p-4 text-sm xl:text-base 3xl:text-lg">
            <div className="flex items-center gap-5">
              <Button
                shape="rounded"
                color={status ? 'info' : 'gray'}
                size="mini"
                onClick={() => {
                  if (!status) setStatus(true);
                }}
              >
                Proposal
              </Button>
              <Button
                shape="rounded"
                color={!status ? 'info' : 'gray'}
                size="mini"
                onClick={() => {
                  if (status) setStatus(false);
                }}
              >
                Pool
              </Button>
            </div>
            {status && (
              <>
                <div className="flex w-full justify-between">
                  <div>Commission</div>
                  <div>{currProposal.proposed_commision}</div>
                </div>
                <div className="flex w-full justify-between">
                  <div>Undercollaterization</div>
                  <div>{currProposal.proposed_undercollaterization}</div>
                </div>
                {currProposal.accepted && (
                  <div className="w-full text-center font-medium tracking-wider text-green-400">
                    ACCEPTED
                  </div>
                )}
                {!currProposal.accepted && (
                  <div className="w-full text-center font-medium tracking-wider text-blue-400">
                    VOTING IN PROGRESS
                  </div>
                )}
              </>
            )}
            {!status && (
              <>
                <div className="flex w-full justify-between">
                  <div>Target Pool Size</div>
                  <div>{currPool.target_pool_size / 10 ** 6}</div>
                </div>
                <div className="flex w-full justify-between">
                  <div>Current Pool Size</div>
                  <div>{currPool.total_assets / 10 ** 6}</div>
                </div>
                <div className="flex w-full justify-between">
                  <div>Pool Address</div>
                  <AnchorLink
                    href={`https://explorer.solana.com/address/${currPool.pool_pubkey}?cluster=devnet`}
                    target="_blank"
                  >
                    {currPool.pool_pubkey.slice(0, 8)}...
                    {currPool.pool_pubkey.slice(24, 32)}
                  </AnchorLink>
                </div>
              </>
            )}
          </div>
        )}
        <div className="flex gap-4">
          <div className="flex gap-3 text-sm xl:text-base 3xl:text-lg">
            <div>Tokens Owned: </div>
            <div className="font-semibold">{balance}</div>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <Input
            type="number"
            value={voteAmt}
            onChange={(e) => setVoteAmt(parseFloat(e.target.value))}
            className="w-full"
          />
          <Button
            onClick={() => {
              if (balance > 0 && voteAmt <= balance) {
                submitFunc(
                  currPool.pool_pubkey,
                  currProposal.proposal_pubkey,
                  voteAmt
                );
              }
            }}
            shape="rounded"
            disabled={balance <= 0}
            color="info"
            size="small"
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportBid;
