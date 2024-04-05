import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';

import Input from '@/components/ui/forms/input';
import Uploader from '@/components/ui/forms/uploader';
import Textarea from '@/components/ui/forms/textarea';
import Slider from 'rc-slider';
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/button/button';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';

import { uploadMetadataToIPFS, uploadFileToIPFS } from '@/lib/helpers/metadata';
import { proposeProposal, addSecurity } from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';

interface CreatePoolProps {}

const Test: React.FC<CreatePoolProps> = ({}) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const wallet = useWallet();

  const proposePropose = async () => {
    if (wallet.publicKey === null) return;

    dispatch(onLoading('Proposing Proposal...'));
    await proposeProposal(
      wallet.publicKey,
      new PublicKey('85MmcigEM6V5MsugUnpRUJczt8XNT24mHxpCreFBASzT'),
      new PublicKey('6y2mqwaax3k6RSyJe7UMkYh7E3HjHyn3paFdLas8NTCu'),
      10,
      5,
      'https://ipfs.io/ipfs/QmevwBeXCAfRmbNdBoPXMt2S9Yvq7pdPeVJotUftobqKWg'
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

  const addSec = async () => {
    if (wallet.publicKey === null) return;

    dispatch(onLoading('Add Security...'));
    await addSecurity(
      wallet.publicKey,
      new PublicKey('85MmcigEM6V5MsugUnpRUJczt8XNT24mHxpCreFBASzT'),
      1,
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Add Security Success',
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
            label: 'Add Security Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <Button
        onClick={proposePropose}
        color="info"
        shape="rounded"
        size="small"
        className="mt-10 w-60"
      >
        Propose Proposal
      </Button>
      <Button
        onClick={addSec}
        color="info"
        shape="rounded"
        size="small"
        className="mt-10 w-60"
      >
        Add Security
      </Button>
    </div>
  );
};

export default Test;
