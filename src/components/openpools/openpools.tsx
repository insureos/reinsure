import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import PoolList from '@/components/openpools/list';
import ActiveLink from '@/components/ui/links/active-link';
import { FarmsData } from '@/data/static/farms-data';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

import axios from '@/lib/axiosClient';
import Spinner from '@/components/custom/spinner';

export default function OpenPools() {
  const [poolsData, setPoolsData] = useState<any[]>([]);

  const [trigger,setTrigger] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPoolData = async () => {
    setLoading(true);
    let config = {
      method: 'GET',
      url: 'https://api.insure-os.com/python/lp?page_no=1&page_size=10',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios(config)
      .then((res) => {
        setPoolsData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);

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
      <div className="test-xs mb-3 grid grid-cols-5 items-center gap-6 rounded-lg bg-light-dark font-semibold shadow-card xl:text-sm 3xl:text-base">
        <span className="px-6 py-6 text-center tracking-wider text-gray-300">
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

      {loading && (
        <div className="mt-10 w-full items-center justify-center">
          <Spinner label={'Fetching Data'} />
        </div>
      )}

      {!loading &&
        (poolsData === null ||
          poolsData === undefined ||
          poolsData.length === 0) && (
          <div className="mt-20 w-full text-center text-lg xl:text-xl 3xl:text-2xl">
            No Data
          </div>
        )}

      {poolsData !== undefined &&
        poolsData !== null &&
        poolsData.length!==0 &&
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
