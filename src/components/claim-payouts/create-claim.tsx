import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import votePool from '@/assets/images/vote-pool.svg';
import AnchorLink from '../ui/links/anchor-link';
import { ExportIcon } from '@/components/icons/export-icon';

import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';

import cn from 'classnames';
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import axios from '@/lib/axiosClient';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { uploadMetadataToIPFS } from '@/lib/helpers/metadata';
import { RaiseClaim } from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';

interface DropdownProps {
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  Options: any[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  active,
  setActive,
  Options,
  placeholder = 'select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChoose = (option: any) => {
    setActive(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[32rem]">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#171E2E] px-6 py-3 text-xs hover:scale-[1.01] xl:text-sm 3xl:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{active !== null ? active?.insurance_name : placeholder}</div>
        <ChevronDownIcon
          className={cn('h-5 w-5 transition-all', isOpen ? 'rotate-180' : '')}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-[115%] z-[10] flex w-[32rem] flex-col rounded-lg bg-gray-800 px-1 shadow-xl">
          {Options.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleChoose(item)}
                className="my-1 flex w-full cursor-pointer items-center justify-between rounded-lg px-6 py-2 text-xs hover:bg-gray-900 xl:text-sm 3xl:text-base"
              >
                {item?.insurance_name}
                {active !== null &&
                  active.insurance_pubkey === item.insurance_pubkey && (
                    <CheckIcon className="h-5 w-5" />
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface CreateClaimProps {}

const CreateClaim: React.FC<CreateClaimProps> = ({}) => {
  const wallet = useWallet();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [allInsurances, setAllInsurances] = useState<any[]>([]);
  const [myInsurances, setMyInsurances] = useState<any[]>([]);

  const [chosenInsurance, setChosenInsurance] = useState<any>(null);
  const [proposal, setProposal] = useState<any>(null);

  const [claimAmount, setClaimAmount] = useState(0);
  const [claimDetails, setClaimDetails] = useState('');
  const [claimTitle, setClaimTitle] = useState('');

  const [payoutDetails, setPayoutDetails] = useState('');
  const [redemPolicy, setRedemPolicy] = useState('');
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
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (
      proposal === null ||
      proposal === undefined ||
      proposal.proposal_docs === null ||
      proposal.proposal_docs === undefined ||
      !proposal.proposal_docs.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(proposal.proposal_docs, 'proposal');
  }, [proposal]);

  useEffect(() => {
    if (
      chosenInsurance === null ||
      chosenInsurance === undefined ||
      chosenInsurance.metadata_link === null ||
      chosenInsurance.metadata_link === undefined ||
      !chosenInsurance.metadata_link.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(chosenInsurance.metadata_link, 'insurance');
  }, [chosenInsurance]);

  const getPoliciesData = () => {
    let config = {
      method: 'GET',
      url: 'https://api.insure-os.com/python/insurance?page_no=1&page_size=20',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        setAllInsurances(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMyInsurances = (data: any) => {
    const fils = data.filter((item: any) => {
      return (
        item.reinsured === true &&
        item.insurance_insurer === wallet.publicKey?.toString()
      );
    });
    setMyInsurances(fils);
  };

  const getProposals = () => {
    let config = {
      method: 'GET',
      url: `https://api.insure-os.com/python/insurance/detail?insurance_pubkey=${chosenInsurance.insurance_pubkey}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        const dat = res.data;
        const prop = dat.filter((item: any) => item.accepted === true);
        setProposal(prop[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPoliciesData();
  }, []);

  useEffect(() => {
    if (wallet.publicKey === null) return;
    getMyInsurances(allInsurances);
  }, [wallet.publicKey, allInsurances]);

  useEffect(() => {
    if (chosenInsurance === null) return;
    getProposals();
  }, [chosenInsurance]);

  const AddDataToIPFS = async () => {
    const metadataHash = await uploadMetadataToIPFS({
      claimTitle: claimTitle,
      claimAmount: claimAmount,
      claimDetails: claimDetails,
    });
    return `https://ipfs.io/ipfs/${metadataHash}`;
  };

  const raiseClaim = async () => {
    if (
      wallet.publicKey === null ||
      proposal === null ||
      chosenInsurance === null ||
      claimTitle === '' ||
      claimDetails === '' ||
      claimAmount === 0
    )
      return;
    if (chosenInsurance.insurance_insurer !== wallet.publicKey.toString())
      return;

    dispatch(onLoading('Raising Claim...'));
    let hadError = false;

    const IpfsHash = (await AddDataToIPFS().catch((err) => {
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

    await RaiseClaim(
      wallet.publicKey,
      new PublicKey(chosenInsurance.insurance_pubkey),
      new PublicKey(proposal?.lp?.pool_pubkey),
      new PublicKey(proposal?.proposal_pubkey),
      claimAmount,
      IpfsHash
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Claim Raising Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: '/claim-payouts',
          })
        );
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Claim Raising Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  return (
    <section className="mx-auto w-full max-w-[1160px] text-sm">
      <header className="mb-10 flex flex-col gap-4 rounded-lg bg-light-dark p-5 py-6 shadow-card xs:p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 xs:gap-3 xl:gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-dark">
            <Image alt="Vote Pool" src={votePool} width={32} height={32} />
          </div>
          <div>
            <h2 className="mb-2 font-medium text-gray-100 xl:text-lg">
              Vote on claim filed by others
            </h2>
            <p className="leading-[1.8] text-gray-400">
              Verify their claim authenticity!
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <Button
            shape="rounded"
            fullWidth={true}
            onClick={() => router.push(routes.claimPayouts)}
          >
            All Filed Claims
          </Button>
        </div>
      </header>

      <h2 className="mb-5 text-base font-medium text-gray-100 xl:text-lg 3xl:text-xl">
        Create a new claim proposal
      </h2>
      <div className="mb-6 rounded-lg bg-light-dark  p-6 pb-8 shadow-card transition-shadow duration-200 hover:shadow-large">
        <h3 className="mb-2 text-base font-medium text-gray-100 xl:text-lg 3xl:text-xl">
          Choose Insurance & Review Claim Conditions
        </h3>
        {wallet.publicKey === null && (
          <div className="mt-5 flex items-center gap-8 text-sm xl:text-base 3xl:text-lg">
            <div>Connect Wallet to File a Claim</div>
            <WalletMultiButton className="rounded-full" />
          </div>
        )}
        {wallet.publicKey !== null && (
          <div className="mt-6 flex flex-col gap-4">
            <Dropdown
              active={chosenInsurance}
              setActive={setChosenInsurance}
              Options={myInsurances}
              placeholder="choose insurance for claim"
            />
          </div>
        )}
        {wallet.publicKey !== null &&
          chosenInsurance !== null &&
          proposal !== null && (
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
                            <div>$ {chosenInsurance?.insurance_name}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Insurance Address</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${chosenInsurance?.insurance_pubkey}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {chosenInsurance?.insurance_pubkey.slice(0, 5)}
                                ...
                                {chosenInsurance?.insurance_pubkey.slice(
                                  27,
                                  32
                                )}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Created by</div>
                            <AnchorLink
                              href={`https://explorer.solana.com/address/${chosenInsurance?.insurance_insurer}?cluster=devnet`}
                              className="flex items-center gap-3"
                              target="_blank"
                            >
                              <div>
                                {chosenInsurance?.insurance_insurer.slice(0, 5)}
                                ...
                                {chosenInsurance?.insurance_insurer.slice(
                                  27,
                                  32
                                )}
                              </div>
                              <ExportIcon className="h-4 w-4" />
                            </AnchorLink>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Maximum Coverage</div>
                            <div>$ {chosenInsurance?.coverage / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Minimum Commission</div>
                            <div>{chosenInsurance?.minimum_commision}%</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Premium (bi-weekly)</div>
                            <div>$ {chosenInsurance?.premium / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Deductible</div>
                            <div>$ {chosenInsurance?.deductible / 10 ** 6}</div>
                          </div>
                          <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                            <div>Insurance Expiry</div>
                            <div>
                              {new Date(
                                chosenInsurance?.expiry * 1000
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
                </div>
                <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                  <div>Premium Due Date</div>
                  <div>
                    {new Date(proposal?.premium_due_date).toLocaleDateString()}{' '}
                    {new Date(proposal?.premium_due_date).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div className="mb-6 rounded-lg bg-light-dark p-6 pb-8 shadow-card transition-shadow duration-200 hover:shadow-large">
        <h3 className="mb-2 text-base font-medium text-gray-100 xl:text-lg 3xl:text-xl">
          Claim Title
        </h3>
        <p className="mb-5 leading-[1.8] text-gray-300">
          Your title introduces your proposal to the voters. Make sure it is
          clear and to the point.
        </p>
        <Input
          value={claimTitle}
          onChange={(e) => setClaimTitle(e.target.value)}
          placeholder="Enter claim title"
        />
      </div>
      <div className="mb-6 rounded-lg bg-light-dark p-6 pb-8 shadow-card transition-shadow duration-200 hover:shadow-large">
        <h3 className="mb-2 text-base font-medium text-gray-100 xl:text-lg 3xl:text-xl">
          Claim Amount
        </h3>
        <p className="mb-5 leading-[1.8] text-gray-300">
          Amount you think is appropriate for your insurance claim as per your
          contract.
        </p>
        <Input
          value={claimAmount}
          onChange={(e) => setClaimAmount(parseInt(e.target.value))}
          type="number"
          placeholder="Enter Claim Amount (In USD)"
        />
      </div>
      <div className="mb-6 rounded-lg bg-light-dark p-5 shadow-card transition-shadow duration-200 hover:shadow-large xs:p-6 xs:pb-8">
        <h3 className="mb-2 text-base font-medium text-gray-100 xl:text-lg 3xl:text-xl">
          Description
        </h3>
        <p className="mb-5 leading-[1.8] text-gray-300">
          Your description should present in full detail what the actions of the
          proposal will do. This is where voters will educate themselves on what
          they are voting on.
        </p>
        <Textarea
          value={claimDetails}
          onChange={(e) => setClaimDetails(e.target.value)}
          placeholder="Add the proposal details here"
          inputClassName="h-36"
        />
      </div>
      <div className="mt-6">
        <Button
          onClick={raiseClaim}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="w-72"
        >
          Create Claim Proposal
        </Button>
      </div>
    </section>
  );
};

export default CreateClaim;
