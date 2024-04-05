import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import PolicyList from '@/components/open-policies/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

import axios from '@/lib/axiosClient';

export default function OpenPolicies() {
  const [policiesData, setPoliciesData] = useState<any[]>([]);

  const getPoliciesData = () => {
    let config = {
      method: 'GET',
      url: 'https://api.insure-os.com/python/insurance?page_no=1&page_size=10',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        setPoliciesData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPoliciesData();
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="test-xs mb-3 grid grid-cols-7 gap-6 rounded-lg bg-light-dark font-semibold shadow-card xl:text-sm 3xl:text-base">
        <span className="col-span-2 px-6 py-6 tracking-wider text-gray-300">
          Insuree Name
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Coverage Amount
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Premium Paid Up
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Maximum Leverage
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Active Bids
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Latest Deductible
        </span>
      </div>

      {policiesData !== undefined &&
        policiesData !== null &&
        policiesData.map((item: any) => (
          <PolicyList key={item.insurance_pubkey} data={item} />
        ))}
    </div>
  );
}
