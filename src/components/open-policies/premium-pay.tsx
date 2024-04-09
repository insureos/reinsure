import { useEffect, useState } from 'react';
import AnchorLink from '../ui/links/anchor-link';
import { ExportIcon } from '@/components/icons/export-icon';

import axios from '@/lib/axiosClient';

import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';
import Textarea from '@/components/ui/forms/textarea';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button/button';

import { PayPremium } from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';

interface PremiumPayProps {
  insurance: any;
  proposalAccepted: any;
}

const PremiumPay: React.FC<PremiumPayProps> = ({
  proposalAccepted,
  insurance,
}) => {
  const [multiplier, setMultiplier] = useState(1);

  const wallet = useWallet();
  const dispatch = useAppDispatch();

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
      proposalAccepted === null ||
      proposalAccepted === undefined ||
      proposalAccepted.proposal_docs === null ||
      proposalAccepted.proposal_docs === undefined ||
      !proposalAccepted.proposal_docs.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(proposalAccepted.proposal_docs, 'proposal');
  }, [proposalAccepted]);

  useEffect(() => {
    if (
      insurance === null ||
      insurance === undefined ||
      insurance.metadata_link === null ||
      insurance.metadata_link === undefined ||
      !insurance.metadata_link.startsWith('https://ipfs')
    )
      return;
    fetchIpfs(insurance.metadata_link, 'insurance');
  }, [insurance]);

  const premiumPayment = async () => {
    if (
      wallet.publicKey === null ||
      insurance === null ||
      insurance === undefined ||
      proposalAccepted === null ||
      proposalAccepted === undefined
    )
      return;

    dispatch(onLoading('Paying premium...'));

    await PayPremium(
      wallet.publicKey,
      new PublicKey(insurance?.insurance_pubkey),
      new PublicKey(proposalAccepted?.lp?.pool_pubkey),
      new PublicKey(proposalAccepted?.proposal_pubkey),
      multiplier
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Premium Payment Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Premium Payment Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
    setMultiplier(1);
  };

  return (
    <div className="flex w-full justify-evenly text-white">
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
                      href={`https://explorer.solana.com/address/${proposalAccepted?.proposal_pubkey}?cluster=devnet`}
                      className="flex items-center gap-3"
                      target="_blank"
                    >
                      <div>
                        {proposalAccepted?.proposal_pubkey.slice(0, 5)}...
                        {proposalAccepted?.proposal_pubkey.slice(27, 32)}
                      </div>
                      <ExportIcon className="h-4 w-4" />
                    </AnchorLink>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Commission</div>
                    <div>{proposalAccepted?.proposed_commision}%</div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Undercollaterization</div>
                    <div>
                      {proposalAccepted?.proposed_undercollaterization}%
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
                    <div>{proposalAccepted?.lp?.pool_name}</div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Pool Address</div>
                    <AnchorLink
                      href={`https://explorer.solana.com/address/${proposalAccepted?.lp?.pool_pubkey}?cluster=devnet`}
                      className="flex items-center gap-3"
                      target="_blank"
                    >
                      <div>
                        {proposalAccepted?.lp?.pool_pubkey.slice(0, 5)}...
                        {proposalAccepted?.lp?.pool_pubkey.slice(27, 32)}
                      </div>
                      <ExportIcon className="h-4 w-4" />
                    </AnchorLink>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Created by</div>
                    <AnchorLink
                      href={`https://explorer.solana.com/address/${proposalAccepted?.lp?.created_by}?cluster=devnet`}
                      className="flex items-center gap-3"
                      target="_blank"
                    >
                      <div>
                        {proposalAccepted?.lp?.created_by.slice(0, 5)}...
                        {proposalAccepted?.lp?.created_by.slice(27, 32)}
                      </div>
                      <ExportIcon className="h-4 w-4" />
                    </AnchorLink>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Pool Created at</div>
                    <div>
                      {new Date(
                        proposalAccepted?.lp?.pool_created_at
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Pool Expiry</div>
                    <div>
                      {new Date(
                        proposalAccepted?.lp?.pool_lifecycle
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Target Size</div>
                    <div>
                      {proposalAccepted?.lp?.target_pool_size / 10 ** 6}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Total Assets</div>
                    <div>{proposalAccepted?.lp?.total_assets / 10 ** 6}</div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm xl:text-base 3xl:text-lg">
                    <div>Total Liabilities</div>
                    <div>
                      {proposalAccepted?.lp?.total_liabilties / 10 ** 6}
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
                        {insurance?.insurance_pubkey.slice(0, 5)}...
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
                        {insurance?.insurance_insurer.slice(0, 5)}...
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
                      {new Date(insurance?.expiry * 1000).toLocaleDateString()}
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
            {new Date(proposalAccepted?.premium_due_date).toLocaleDateString()}{' '}
            {new Date(proposalAccepted?.premium_due_date).toLocaleTimeString()}
          </div>
        </div>
        {wallet.publicKey !== null &&
          wallet.publicKey.toString() === insurance?.insurance_insurer && (
            <>
              <div className="text-lg font-semibold xl:text-xl 3xl:text-2xl">
                Pay Premium -
              </div>
              <div className="flex w-full items-end gap-3">
                <Input
                  type="number"
                  label="premium multiplier (eg: 1,2,3)"
                  value={multiplier}
                  onChange={(e) => setMultiplier(parseInt(e.target.value))}
                />
                <Button
                  onClick={premiumPayment}
                  shape="rounded"
                  size="small"
                  color="info"
                >
                  Pay
                </Button>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default PremiumPay;
