import { useState, useEffect } from 'react';
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
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import axios from '@/lib/axiosClient';

import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';

import { uploadMetadataToIPFS, uploadFileToIPFS } from '@/lib/helpers/metadata';
import {
  proposeProposal,
  getLpTokenBalance,
  voteOnProposal,
} from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import AnchorLink from '../ui/links/anchor-link';

import CreateBid from '@/components/open-policies/create-bid';

import SupportBid from '@/components/open-policies/support-bid';

interface PolicyListTypes {
  data: any;
}

const PolicyList: React.FC<PolicyListTypes> = ({ data }) => {
  const [isExpand, setIsExpand] = useState(false);

  const dispatch = useAppDispatch();

  const wallet = useWallet();

  // const setFrom = from as CoinList;
  // const setTo = to as CoinList;
  const { votes, totalVote } = getVotesByStatus('active');
  const [supportBidModal, setSupportBidModal] = useState(false);
  const [createBidModal, setCreateBidModal] = useState(false);

  const [poolsData, setPoolsData] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);

  const [proposalPools, setProposalPools] = useState<any[]>([]);

  function removeDuplicates(array: any, property: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t[property] === obj[property])
    );
  }

  const filterPools = (data: any) => {
    const pools = data.map((item: any) => item.lp);
    const noDup = removeDuplicates(pools, 'pool_pubkey');
    setProposalPools(noDup);
  };

  const AddDataToIPFS = async (data: string) => {
    const metadataHash = await uploadMetadataToIPFS({
      policyDetails: data,
    });
    return `https://ipfs.io/ipfs/${metadataHash}`;
  };

  const proposePropose = async (
    lp: string,
    proposedCommission: number,
    proposedUndercollaterization: number,
    policyDetails: string
  ) => {
    if (wallet.publicKey === null || lp === '') return;

    dispatch(onLoading('Proposing Proposal...'));
    let hadError = false;

    const IpfsHash = (await AddDataToIPFS(policyDetails).catch((err) => {
      hadError = false;
      dispatch(
        onFailure({
          label: 'IPFS pinning Failed',
          description: err.message,
          link: '',
          redirect: null,
        })
      );
    })) as any;
    if (hadError) return;

    await proposeProposal(
      wallet.publicKey,
      new PublicKey(lp),
      new PublicKey(data.insurance_pubkey),
      proposedCommission,
      proposedUndercollaterization,
      IpfsHash
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Proposing Proposal Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        setCreateBidModal(false);
        getProposals();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Proposing Proposal Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  const votingOnProposal = async (
    lp: string,
    proposal: string,
    amount: number
  ) => {
    if (wallet.publicKey === null || lp === '') return;

    dispatch(onLoading('Voting on Proposal...'));

    await voteOnProposal(
      wallet.publicKey,
      new PublicKey(lp),
      new PublicKey(data.insurance_pubkey),
      new PublicKey(proposal),
      amount
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Voting on Proposal Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        setSupportBidModal(false);
        getProposals();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Voting on Proposal Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  const getPoolData = () => {
    let config = {
      method: 'GET',
      url: 'https://api.insure-os.com/python/lp?page_no=1&page_size=10',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        const insuranceExpiry = data.expiry * 1000;
        const filteredPools1 = res.data.filter((item: any) => {
          const dateString = item.pool_lifecycle;
          const dateMilliseconds = new Date(dateString).getTime();
          return insuranceExpiry < dateMilliseconds;
        });
        // console.log(filteredPools1);
        setPoolsData(filteredPools1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProposals = () => {
    let config = {
      method: 'GET',
      url: `https://api.insure-os.com/python/insurance/detail?insurance_pubkey=${data.insurance_pubkey}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        setProposals(res.data);
        filterPools(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProposals();
    getPoolData();
  }, []);

  useLockBodyScroll(supportBidModal || createBidModal);

  return (
    <>
      {supportBidModal && (
        <SupportBid
          proposals={proposals}
          proposalPools={proposalPools}
          setIsOpen={setSupportBidModal}
          submitFunc={votingOnProposal}
        />
      )}
      {createBidModal && (
        <CreateBid
          setIsOpen={setCreateBidModal}
          poolsData={poolsData}
          submitFunc={proposePropose}
        />
      )}

      <div className="relative mb-3 overflow-hidden rounded-lg bg-light-dark shadow-card transition-all last:mb-0 hover:shadow-large">
        <div
          onClick={() => setIsExpand(!isExpand)}
          className="relative grid h-auto cursor-pointer grid-cols-7 items-center gap-3 py-4 sm:h-20 sm:gap-6 sm:py-0"
        >
          <div className="col-span-2 px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {/* <CurrencySwapIcons from={setFrom} to={setTo} /> */}
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data.coverage}
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data.premium}
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base"></div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base"></div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data.deductible}
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
              <VoterTable
                getProposals={getProposals}
                insurance={data}
                data={proposals}
              />
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

export default PolicyList;
