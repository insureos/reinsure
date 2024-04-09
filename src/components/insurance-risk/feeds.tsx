import { useState, useEffect } from 'react';
import cn from 'classnames';
import { NFTList } from '@/data/static/nft-list';
import OracleCard from '@/components/ui/oracle-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Connection, PublicKey } from '@solana/web3.js';
import {
  AggregatorAccount,
  SwitchboardProgram,
  TransactionObject,
} from '@switchboard-xyz/solana.js';

import Spinner from '../custom/spinner';

const oracles = [
  '6ZHu1KANAyUf1MUAobfJo85bsgNCMHtAEQmtXA82u6G',
  'Hu31F6akVddLMdnkMmWi9kSytu6Pebhh21xax8E3Zw4k',
  '44VhLzsPomZXcEvAXPMYKtfRNEYm4UetR9c7spc5uGfv',
  'E3xheAnJmJpXDMR6RDkAJ48DMbZTiVEhuTxzMxvHSRSr',
  'CnpZsqKVdpHvK9PetZC6SqzbKvNzxGQ92tb2DedBNwTR',
];

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const [oraclesData, setOraclesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getDataFeed = async (address: string) => {
    const program = await SwitchboardProgram.load(
      new Connection('https://api.devnet.solana.com')
    );

    const aggregatorAccount = new AggregatorAccount(program, address);

    const result1 = await aggregatorAccount.fetchLatestValue();
    const result2 = await aggregatorAccount.fetchAccounts();
    const name1 = result2.aggregator.data.name;
    const name2 = String.fromCharCode(...name1).split('\x00')[0];
    return {
      name: name2,
      value: result1?.toNumber(),
      address: address,
    };
  };

  const getAllData = async () => {
    setLoading(true);
    const res: any[] = [];
    for (let i = 1; i < oracles.length; i++) {
      await getDataFeed(oracles[i]).then((resp) => res.push(resp));
    }
    setOraclesData(res);
    setLoading(false);
  };

  useEffect(() => {
    if (oraclesData.length === 0) {
      getAllData();
    }
  }, []);

  useEffect(() => {
    console.log(oraclesData);
  }, [oraclesData]);

  return (
    <div
      className={cn(
        'grid gap-5 sm:grid-cols-2',
        isGridCompact
          ? '3xl:!grid-cols-3 4xl:!grid-cols-4'
          : '3xl:!grid-cols-2 4xl:!grid-cols-3',
        className
      )}
    >
      {loading && <Spinner />}
      {!loading &&
        oraclesData.map((item, idx) => <OracleCard key={idx} data={item} />)}
    </div>
  );
}
