import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/button/button';
import cn from 'classnames';
import VoterTable from '@/components/open-policies/voter-table';
import axios from '@/lib/axiosClient';

import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';

import { uploadMetadataToIPFS } from '@/lib/helpers/metadata';
import {
  proposeProposal,
  voteOnProposal,
} from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import AnchorLink from '../ui/links/anchor-link';

import CreateBid from '@/components/open-policies/create-bid';

import SupportBid from '@/components/open-policies/support-bid';
import Spinner from '@/components/custom/spinner';

import PremiumPay from '@/components/open-policies/premium-pay';

interface PolicyListTypes {
  data: any;
}

const PolicyList: React.FC<PolicyListTypes> = ({ data }) => {
  const [isExpand, setIsExpand] = useState(false);

  const dispatch = useAppDispatch();

  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  const [supportBidModal, setSupportBidModal] = useState(false);
  const [createBidModal, setCreateBidModal] = useState(false);

  const [poolsData, setPoolsData] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);

  const [proposalPools, setProposalPools] = useState<any[]>([]);

  const [acceptedProposal, setAcceptedProposal] = useState<any>(null);

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

  const checkAccepted = (data: any) => {
    const accepted = data.filter((item: any) => item.accepted === true);
    if (accepted.length > 0) {
      setAcceptedProposal(accepted[0]);
    }
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
    setLoading(true);
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
        checkAccepted(res.data);
        filterPools(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isExpand === true) {
      getProposals();
      getPoolData();
    }
  }, [data, isExpand]);

  useLockBodyScroll(supportBidModal || createBidModal);

  return (
    <>
      {!loading && acceptedProposal === null && supportBidModal && (
        <SupportBid
          proposals={proposals}
          proposalPools={proposalPools}
          setIsOpen={setSupportBidModal}
          submitFunc={votingOnProposal}
        />
      )}
      {!loading && acceptedProposal === null && createBidModal && (
        <CreateBid
          setIsOpen={setCreateBidModal}
          poolsData={poolsData}
          submitFunc={proposePropose}
        />
      )}
      <div className="relative mb-3 overflow-hidden rounded-lg bg-light-dark shadow-card transition-all last:mb-0 hover:shadow-large">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsExpand(!isExpand);
          }}
          className="relative grid h-auto cursor-pointer grid-cols-7 items-center gap-3 py-4 sm:h-20 sm:gap-6 sm:py-0"
        >
          <div className="col-span-2 px-8 text-xs font-medium text-white xl:text-sm 3xl:text-base">
            <AnchorLink
              href={`https://explorer.solana.com/address/${data?.insurance_insurer}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              {data?.insurance_insurer.slice(0, 8)}...
              {data?.insurance_insurer.slice(24, 32)}
            </AnchorLink>
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data.coverage}
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data.premium}
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base"></div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data?.minimum_commision}
          </div>
          <div className="px-4 text-center text-xs font-medium uppercase tracking-wider text-white xl:text-sm 3xl:text-base">
            {data.deductible}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {!loading && acceptedProposal === null && isExpand && (
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
              <VoterTable
                getProposals={getProposals}
                insurance={data}
                data={proposals}
              />
            </motion.div>
          )}
          {!loading && acceptedProposal !== null && isExpand && (
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
                <PremiumPay
                  insurance={data}
                  proposalAccepted={acceptedProposal}
                />
              </div>
            </motion.div>
          )}
          {loading && (
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
                <Spinner label={'Fetching Data'} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PolicyList;
