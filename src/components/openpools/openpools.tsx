import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import PoolList from '@/components/openpools/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

import axios from '@/lib/axiosClient';

export default function OpenPools() {
  const [poolsData, setPoolsData] = useState<any[]>([]);

  const [trigger,setTrigger] = useState(0);

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
        setPoolsData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPoolData();
  }, [trigger]);

  return (
    <div className="mx-auto w-full">
      <div className="mb-4 flex w-full justify-end">
        <AnchorLink href="/open-pools/create">
          <Button shape="rounded" size="small">
            Create Pool
          </Button>
        </AnchorLink>
      </div>
      <div className="test-xs mb-3 grid grid-cols-6 gap-6 rounded-lg bg-light-dark font-semibold shadow-card xl:text-sm 3xl:text-base">
        <span className="col-span-2 px-6 py-6 tracking-wider text-gray-300">
          Pool Name
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Target Pool Size
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Current Pool Size
        </span>
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
          Over Capitalization ratio
        </span>
        <span className="px-4 py-6 text-center tracking-wider text-gray-300">
          Pool Lifecycle
        </span>
      </div>

      {poolsData !== undefined &&
        poolsData !== null &&
        poolsData.map((item: any) => (
          <PoolList
            setTrigger={setTrigger}
            key={item.pool_pubkey}
            data={item}
          />
        ))}
    </div>
  );
}
