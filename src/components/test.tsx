import React, { Fragment, useState, useEffect } from 'react';

import Big from 'big.js';
import { Connection, PublicKey } from '@solana/web3.js';
import {
  AggregatorAccount,
  SwitchboardProgram,
  TransactionObject,
} from '@switchboard-xyz/solana.js';

import { useWallet } from '@solana/wallet-adapter-react';

interface CreatePoolProps {}

const Test: React.FC<CreatePoolProps> = ({}) => {
  const wallet = useWallet();

  const getDataFeed = async () => {
    const program = await SwitchboardProgram.load(
      new Connection('https://api.devnet.solana.com')
    );

    const aggregatorAccount = new AggregatorAccount(
      program,
      'CnpZsqKVdpHvK9PetZC6SqzbKvNzxGQ92tb2DedBNwTR'
    );

    const result = await aggregatorAccount.loadHistory();
    if (result === null) {
      console.log('Aggregator holds no value');
    } else {
      console.log(result.map((item)=>item.value.toString()));
    }
  };

  useEffect(() => {
    getDataFeed();
  }, [wallet.publicKey]);

  return (
    <div>
      <div>BRRRRR</div>
    </div>
  );
};

export default Test;
