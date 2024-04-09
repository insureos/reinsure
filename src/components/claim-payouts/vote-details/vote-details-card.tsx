import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import AuctionCountdown from '@/components/insurance-risk-oracle/auction-countdown';
import VotePoll from '@/components/claim-payouts/vote-details/vote-poll';
import { getVotesByStatus } from '@/data/static/vote-data';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ExportIcon } from '@/components/icons/export-icon';
import axios from '@/lib/axiosClient';

import Image from '@/components/ui/image';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import votePool from '@/assets/images/vote-pool.svg';
import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';

import {
  ClaimVote,
  sendClaimDecision,
  ReleaseClaim,
} from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch } from 'react-redux';

interface VoteActionButtonProps {
  data: any;
  getClaimData: any;
}

const VoteActionButton: React.FC<VoteActionButtonProps> = ({
  data,
  getClaimData,
}) => {
  const [voteAmt, setVoteAmt] = useState(0);
  const wallet = useWallet();
  const dispatch = useDispatch();

  const payVoteClaim = async (voteState: boolean) => {
    if (
      wallet.publicKey === null ||
      data.claim_addr === null ||
      data.claim_addr === undefined ||
      data.claim_addr === '' ||
      voteAmt === 0
    )
      return;

    dispatch(onLoading('Voting on Claim...'));

    await ClaimVote(
      wallet.publicKey,
      new PublicKey(data?.claim_addr),
      voteAmt,
      voteState
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Claim Voting Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        getClaimData();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Claim Voting Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
    setVoteAmt(0);
  };

  return (
    <div className="mt-10 flex items-end gap-3">
      <Input
        type="number"
        value={voteAmt}
        placeholder="vote amount"
        label="Vote Amount ($)"
        className="w-[50%]"
        onChange={(e) => setVoteAmt(parseFloat(e.target.value))}
      />
      <Button
        onClick={() => payVoteClaim(true)}
        shape="rounded"
        color="success"
        className="w-[20%]"
      >
        Accept
      </Button>
      <Button
        onClick={() => payVoteClaim(false)}
        shape="rounded"
        color="danger"
        className="w-[20%]"
      >
        Reject
      </Button>
    </div>
  );
};

interface VoteDetailsCardProps {
  claimData: any;
  getClaimData: any;
}

const VoteDetailsCard: React.FC<VoteDetailsCardProps> = ({
  claimData,
  getClaimData,
}) => {
  const wallet = useWallet();
  const dispatch = useDispatch();

  const [isExpand, setIsExpand] = useState(false);
  const { votes, totalVote } = getVotesByStatus('active');

  const [proposal, setProposal] = useState<any>(null);
  const [insurance, setInsurance] = useState<any>(null);

  const [payoutDetails, setPayoutDetails] = useState('');
  const [redemPolicy, setRedemPolicy] = useState('');
  const [claimDesc, setClaimDesc] = useState('');

  const parseDateToMilliseconds = (dateStr: string) => {
    let dateParts: any;
    let daysPart: any;
    let timePart: any;

    let days = 0;
    if (dateStr.includes(',')) {
      dateParts = dateStr.split(', ');
      daysPart = dateParts[0].split(' ')[0];
      timePart = dateParts[1];
      days = parseInt(daysPart);
    } else {
      timePart = dateStr;
    }

    const [hours, minutes, seconds, milliseconds] = timePart
      .split(/[:,.]/)
      .map(Number);

    let totalMilliseconds =
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000;

    if (milliseconds !== undefined) {
      totalMilliseconds += parseInt((milliseconds / 1000).toString());
    }
    return totalMilliseconds;
  };

  const milliseconds = parseDateToMilliseconds(claimData?.voting_ending_in);
  const startTime = new Date(claimData?.voting_start).getTime();
  const dateNow = new Date();
  const endTime = dateNow.getTime() + milliseconds;

  const fetchIpfs = async (link: string, type: string) => {
    axios
      .get(
        link.replace('https://ipfs.io', 'https://defi-os.infura-ipfs.io') || ''
      )
      .then((res) => {
        if (type === 'proposal') {
          setPayoutDetails(res.data?.policyDetails);
        }
        if (type === 'insurance') {
          setRedemPolicy(res.data?.redemptionPolicy);
        }
        if (type === 'claim') {
          setClaimDesc(res.data?.claimDetails);
        }
      })
      .catch((e) => console.log(e));
  };

  const getProposalData = async () => {
    let config = {
      method: 'GET',
      url: `https://api.insure-os.com/python/insurance/detail?insurance_pubkey=${claimData.insurance}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        setProposal(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInsuranceData = async () => {
    let config = {
      method: 'GET',
      url: `https://api.insure-os.com/python/insurance?page_no=1&page_size=10&insurance_pubkey=${claimData.insurance}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        setInsurance(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      !isExpand ||
      proposal === null ||
      proposal === undefined ||
      proposal.proposal_docs === null ||
      proposal.proposal_docs === undefined ||
      !proposal.proposal_docs.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(proposal.proposal_docs, 'proposal');
  }, [proposal, isExpand]);

  useEffect(() => {
    if (
      !isExpand ||
      insurance === null ||
      insurance === undefined ||
      insurance.metadata_link === null ||
      insurance.metadata_link === undefined ||
      !insurance.metadata_link.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(insurance.metadata_link, 'insurance');
  }, [insurance, isExpand]);

  useEffect(() => {
    if (
      !isExpand ||
      claimData === null ||
      claimData === undefined ||
      claimData.claim_description === null ||
      claimData.claim_description === undefined ||
      !claimData.claim_description.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(claimData.claim_description, 'claim');
  }, [claimData, isExpand]);

  useEffect(() => {
    if (isExpand === true) {
      getInsuranceData();
      getProposalData();
    }
  }, [claimData, isExpand]);

  const claimDecision = async () => {
    if (
      wallet.publicKey === null ||
      claimData.claim_addr === null ||
      claimData.claim_addr === undefined ||
      claimData.claim_addr === ''
    )
      return;

    dispatch(onLoading('Make Claim Decision...'));

    await sendClaimDecision(
      wallet.publicKey,
      new PublicKey(claimData?.claim_addr)
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Claim Decision Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        getClaimData();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Claim Decision Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  const redeemClaim = async () => {
    if (
      wallet.publicKey === null ||
      claimData.insurance_insurer === null ||
      claimData.insurance_insurer === undefined ||
      claimData.insurance_insurer === '' ||
      wallet.publicKey.toString() !== claimData.insurance_insurer
    )
      return;

    dispatch(onLoading('Releasing Security...'));

    await ReleaseClaim(
      wallet.publicKey,
      new PublicKey(claimData.insurance),
      new PublicKey(claimData.lp),
      new PublicKey(claimData.reinsurance),
      new PublicKey(claimData.claim_addr)
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Releasing Security Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        getClaimData();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Releasing Security Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  return (
    <div
      className={cn(
        'mb-3 rounded-lg bg-light-dark p-5 transition-shadow duration-200 xs:p-6 xl:p-4',
        isExpand ? 'shadow-large' : 'shadow-card hover:shadow-large'
      )}
    >
      <div
        className={cn(
          'flex w-full flex-col-reverse justify-between ',
          'md:grid md:grid-cols-3'
        )}
      >
        <div className="self-start md:col-span-2">
          <div
            onClick={() => setIsExpand(!isExpand)}
            className="cursor-pointer text-lg font-medium leading-normal xl:text-xl 3xl:text-2xl"
          >
            {claimData?.claim_title}
          </div>
          <div className="mt-5 flex gap-2 text-sm xl:text-base 3xl:text-lg">
            <div>Claim Address - </div>
            <AnchorLink
              href={`https://explorer.solana.com/address/${claimData?.claim_addr}?cluster=devnet`}
              className="flex items-center gap-3"
              target="_blank"
            >
              <div>
                {claimData?.claim_addr?.slice(0, 5)}...
                {claimData?.claim_addr?.slice(27, 32)}
              </div>
              <ExportIcon className="h-4 w-4" />
            </AnchorLink>
          </div>

          {!isExpand &&
            !claimData.claim_accepted &&
            new Date(endTime).getTime() - dateNow.getTime() > 0 && (
              <Button
                onClick={() => setIsExpand(!isExpand)}
                className="mt-4 w-full xs:mt-6 xs:w-auto md:mt-10"
                shape="rounded"
              >
                Vote Now
              </Button>
            )}
          {isExpand &&
            !claimData.claim_accepted &&
            new Date(endTime).getTime() - dateNow.getTime() > 0 && (
              <VoteActionButton data={claimData} getClaimData={getClaimData} />
            )}
          {!isExpand &&
            !claimData.claim_accepted &&
            new Date(endTime).getTime() - dateNow.getTime() < 0 && (
              <div className="mt-4 flex w-full items-center justify-between pr-4 xs:mt-6 md:mt-10">
                <Button onClick={() => setIsExpand(!isExpand)} shape="rounded">
                  Expand
                </Button>
                <Button shape="rounded" onClick={claimDecision}>
                  Accept Vote Result
                </Button>
              </div>
            )}
          {isExpand &&
            !claimData.claim_accepted &&
            new Date(endTime).getTime() - dateNow.getTime() < 0 && (
              <div className="mt-4 flex w-full items-center justify-between pr-4 xs:mt-6 md:mt-10">
                <div />
                <Button shape="rounded" onClick={claimDecision}>
                  Accept Vote Result
                </Button>
              </div>
            )}

          {claimData.claim_accepted &&
            !claimData.claim_claimed &&
            wallet.publicKey?.toString() === claimData.insurance_insurer && (
              <div className="mt-4 flex w-full items-center justify-between pr-4 xs:mt-6 md:mt-10">
                <div />
                <Button shape="rounded" color="success" onClick={redeemClaim}>
                  Release Security
                </Button>
              </div>
            )}

          {claimData.claim_claimed && (
            <div className="mt-4 flex w-full items-center justify-between pr-4 text-base font-medium uppercase text-green-400 xs:mt-6 md:mt-10 xl:text-lg 3xl:text-xl">
              Security Released
            </div>
          )}
        </div>

        <div
          className={cn(
            "before:content-[' '] relative grid h-full gap-2 border-gray-700 before:absolute before:bottom-0 before:left-0 before:border-b before:border-r  before:border-dashed before:border-gray-700 xs:gap-2.5 ",
            'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:pl-5 md:before:h-full md:before:w-[1px] xl:pl-3'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="uppercase">Expected Compensation :</div>
            <div className="xl:text-cl text-base xl:text-lg">
              $ {claimData?.claim_amount / 10 ** 6}
            </div>
          </div>
          <h3 className="flex flex-col gap-2 text-xs font-medium md:uppercase xl:text-sm 3xl:text-base ">
            <div>Voting ends in :</div>
            <AuctionCountdown date={new Date(endTime)} />
          </h3>
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
            <div className="my-6 border-t border-dashed border-gray-700" />
            <VotePoll
              title={'Votes'}
              accepted={{
                vote: claimData?.vote_positive / 10 ** 6,
                percentage:
                  claimData?.vote_positive + claimData?.vote_negative !== 0
                    ? (claimData?.vote_positive /
                        (claimData?.vote_positive + claimData?.vote_negative)) *
                      100
                    : 0,
              }}
              rejected={{
                vote: claimData?.vote_negative / 10 ** 6,
                percentage:
                  claimData?.vote_positive + claimData?.vote_negative !== 0
                    ? (claimData?.vote_negative /
                        (claimData?.vote_positive + claimData?.vote_negative)) *
                      100
                    : 0,
              }}
            />
            <div className="my-6 flex flex-col gap-4 border-y border-dashed border-gray-700 py-6">
              <div className="text-lg font-semibold xl:text-xl 3xl:text-2xl">
                Claim Description
              </div>
              <div>{claimDesc}</div>
            </div>
            <div className="my-6 flex gap-6">
              <Tab.Group key={'list-tabs'}>
                <div className="flex h-[30rem] w-[60%] flex-col justify-between rounded-xl bg-light-dark">
                  <div className="mx-3 mb-3 flex items-start rounded-xl bg-dark px-3">
                    <div className="-mb-4 flex h-full min-h-[36px] w-full items-start overflow-hidden xs:mb-0">
                      <Tab.List className="coin-list-scrollbar relative flex w-full justify-evenly overflow-x-auto scroll-smooth text-sm">
                        <TabItem className="whitespace-nowrap capitalize text-gray-600 2xl:uppercase [&>span]:px-0">
                          Proposal
                        </TabItem>
                        <TabItem className="whitespace-nowrap px-0 capitalize text-gray-600 2xl:uppercase">
                          Pool
                        </TabItem>
                        <TabItem className="whitespace-nowrap px-0 capitalize text-gray-600 2xl:uppercase">
                          Insurance
                        </TabItem>
                      </Tab.List>
                    </div>
                  </div>
                  <div className="h-[90%]">
                    <TabPanels className="m-4 h-full">
                      <TabPanel className="focus:outline-none">
                        <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-gray-600 p-6">
                          <div className="text-lg font-semibold xl:text-xl 3xl:text-2xl">
                            Proposal Details
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Proposal Address</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${proposal?.proposal_pubkey}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {proposal?.proposal_pubkey.slice(0, 5)}...
                                {proposal?.proposal_pubkey.slice(27, 32)}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Commission</div>
                            <div>{proposal?.proposed_commision}%</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Undercollaterization</div>
                            <div>
                              {proposal?.proposed_undercollaterization}%
                            </div>
                          </div>
                          <div className="flex w-full flex-col gap-2 text-sm xl:text-base 3xl:text-lg">
                            <div>Policy Payout Details :</div>
                            <Textarea
                              disabled
                              value={payoutDetails}
                              className="w-full overflow-y-auto overflow-x-hidden rounded-xl"
                            />
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="focus:outline-none">
                        <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-gray-600 p-6">
                          <div className="text-lg font-semibold xl:text-xl 3xl:text-2xl">
                            Pool Details
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Pool Name</div>
                            <div>{proposal?.lp?.pool_name}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Pool Address</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${proposal?.lp?.pool_pubkey}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {proposal?.lp?.pool_pubkey.slice(0, 5)}...
                                {proposal?.lp?.pool_pubkey.slice(27, 32)}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Created by</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${proposal?.lp?.created_by}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {proposal?.lp?.created_by.slice(0, 5)}...
                                {proposal?.lp?.created_by.slice(27, 32)}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Pool Created at</div>
                            <div>
                              {new Date(
                                proposal?.lp?.pool_created_at
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Pool Expiry</div>
                            <div>
                              {new Date(
                                proposal?.lp?.pool_lifecycle
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Target Size</div>
                            <div>
                              {proposal?.lp?.target_pool_size / 10 ** 6}
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Total Assets</div>
                            <div>{proposal?.lp?.total_assets / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Total Liabilities</div>
                            <div>
                              {proposal?.lp?.total_liabilties / 10 ** 6}
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="focus:outline-none">
                        <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-gray-600 p-6">
                          <div className="text-lg font-semibold xl:text-xl 3xl:text-2xl">
                            Insurance Details
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Insurance Name</div>
                            <div>$ {insurance?.insurance_name}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Insurance Address</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${insurance?.insurance_pubkey}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {insurance?.insurance_pubkey.slice(0, 5)}
                                ...
                                {insurance?.insurance_pubkey.slice(27, 32)}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Created by</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${insurance?.insurance_insurer}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {insurance?.insurance_insurer.slice(0, 5)}
                                ...
                                {insurance?.insurance_insurer.slice(27, 32)}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Maximum Coverage</div>
                            <div>$ {insurance?.coverage / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Minimum Commission</div>
                            <div>{insurance?.minimum_commision}%</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Premium (bi-weekly)</div>
                            <div>$ {insurance?.premium / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Deductible</div>
                            <div>$ {insurance?.deductible / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Insurance Expiry</div>
                            <div>
                              {new Date(
                                insurance?.expiry * 1000
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </div>
                </div>
              </Tab.Group>
              <div className="flex w-[35%] flex-col gap-4">
                <div className="text-lg font-semibold xl:text-xl 3xl:text-2xl">
                  Premium Details
                </div>
                <div className="flex w-full flex-col gap-2 text-sm xl:text-base 3xl:text-lg">
                  <div>Redemption Policy :</div>
                  <Textarea
                    disabled
                    value={redemPolicy}
                    className="w-full overflow-y-auto overflow-x-hidden rounded-xl"
                  />
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Premium Due Date</div>
                    <div>
                      {new Date(
                        proposal?.premium_due_date
                      ).toLocaleDateString()}{' '}
                      {new Date(
                        proposal?.premium_due_date
                      ).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoteDetailsCard;
