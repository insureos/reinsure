import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import PolicyList from '@/components/open-policies/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

import { Switch } from '@headlessui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from '@/lib/axiosClient';

import Spinner from '@/components/custom/spinner';

export default function OpenPolicies() {
  const wallet = useWallet();
  const [policiesData, setPoliciesData] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [myPolicy, setMyPolicy] = useState(false);

  const getPoliciesData = () => {
    setLoading(true);
    let config = {
      method: 'GET',
      url: 'https://api.insure-os.com/python/insurance?page_no=1&page_size=10',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        let filteredData: any = [];
        if (wallet.publicKey !== null) {
          filteredData = res.data.filter(
            (item: any) =>
              item.insurance_insurer === wallet.publicKey?.toString()
          );
        }
        setPoliciesData(
          myPolicy && wallet.publicKey !== null ? filteredData : res.data
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getPoliciesData();
  }, [myPolicy,wallet.publicKey]);

  return (
    <div className="mx-auto w-full">
      <div
        onClick={() => setMyPolicy(!myPolicy)}
        className="mb-8 flex cursor-pointer items-center gap-5"
      >
        <div className="text-base xl:text-lg 3xl:text-xl">My Policies</div>
        <Switch checked={myPolicy} onChange={() => setMyPolicy(!myPolicy)}>
          <div
            className={cn(
              myPolicy ? 'bg-blue-500' : 'bg-gray-700',
              'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                myPolicy
                  ? 'translate-x-5 bg-gray-700'
                  : 'translate-x-0.5 bg-gray-400',
                'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
              )}
            />
          </div>
        </Switch>
      </div>

      <div className="test-xs mb-3 grid grid-cols-7 items-center gap-6 rounded-lg bg-light-dark font-semibold shadow-card xl:text-sm 3xl:text-base">
        <span className="col-span-2 px-6 py-6 tracking-wider text-gray-300">
          Insuree Name
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Coverage Amount ($)
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Premium ($)
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Maximum Leverage
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Minimum Commission (%)
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Latest Deductible ($)
        </span>
      </div>

      {!loading &&
        policiesData !== undefined &&
        policiesData !== null &&
        policiesData.length > 0 &&
        policiesData.map((item: any) => (
          <PolicyList key={item.insurance_pubkey} data={item} />
        ))}

      {loading && (
        <div className="mt-10 w-full items-center justify-center">
          <Spinner label={'Fetching Data'} />
        </div>
      )}

      {!loading &&
        (policiesData === null ||
          policiesData === undefined ||
          policiesData.length === 0) && (
          <div className="mt-20 w-full text-center text-lg xl:text-xl 3xl:text-2xl">
            No Data
          </div>
        )}
    </div>
  );
}
