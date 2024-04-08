import { useState, useEffect } from 'react';
import Button from '@/components/ui/button/button';

import {
  sendAcceptProposal,
  AcceptInsuranceProposal,
} from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import AnchorLink from '../ui/links/anchor-link';
import { useDispatch } from 'react-redux';

interface VoteTableListProps {
  listData: any;
  insurance: any;
  getProposals: any;
}

const VoterTableList: React.FC<VoteTableListProps> = ({
  listData,
  insurance,
  getProposals,
}) => {
  const wallet = useWallet();

  const dispatch = useDispatch();

  const sendProposal = async (lp: string, proposal: string) => {
    if (wallet.publicKey === null || lp === '' || proposal === '') return;

    dispatch(onLoading('Sending Proposal...'));

    await sendAcceptProposal(
      wallet.publicKey,
      new PublicKey(lp),
      new PublicKey(proposal)
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Sending Proposal Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        getProposals();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Sending Proposal Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  const acceptProposal = async (
    insuranceCreator: string,
    insurance: string,
    lp: string,
    proposal: string
  ) => {
    if (
      wallet.publicKey === null ||
      insurance === '' ||
      lp === '' ||
      proposal === ''
    )
      return;
    if (wallet.publicKey.toString() !== insuranceCreator) return;

    dispatch(onLoading('Accepting Proposal...'));

    await AcceptInsuranceProposal(
      wallet.publicKey,
      new PublicKey(insurance),
      new PublicKey(lp),
      new PublicKey(proposal)
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Accepting Proposal Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/tx/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
        getProposals();
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Accepting Proposal Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  return (
    <div className="my-4 grid w-full grid-cols-5 items-center gap-3 text-xs xl:text-sm 3xl:text-base">
      <div className="px-4">{listData?.lp?.pool_name}</div>
      <div className="px-4 text-center">{listData?.proposed_commision}</div>
      <div className="px-4 text-center">
        {listData?.proposed_undercollaterization}
      </div>
      <div className="px-4 text-center">
        {listData?.proposal_votes / 10 ** 6}/
        {listData?.lp?.total_assets / 10 ** 6}
      </div>
      {listData.sent && !listData.accepted && (
        <>
          {(wallet.publicKey === null ||
            wallet.publicKey.toString() !== insurance.insurance_insurer) && (
            <div className="px-4 text-center font-medium tracking-wider text-blue-400">
              PROPOSAL SENT
            </div>
          )}
          {wallet.publicKey !== null &&
            wallet.publicKey.toString() === insurance.insurance_insurer && (
              <Button
                onClick={() =>
                  acceptProposal(
                    insurance.insurance_insurer,
                    insurance.insurance_pubkey,
                    listData.lp.pool_pubkey,
                    listData.proposal_pubkey
                  )
                }
                size="mini"
                shape="rounded"
                color="success"
              >
                Accept
              </Button>
            )}
        </>
      )}
      {listData.accepted && (
        <div className="px-4 text-center font-medium tracking-wider text-green-400">
          ACCEPTED
        </div>
      )}
      {!listData.sent &&
        !listData.accepted &&
        listData?.proposal_votes <= listData?.lp?.total_assets / 2 && (
          <div className="px-4 text-center font-medium tracking-wider text-yellow-400">
            VOTING IN PROGRESS
          </div>
        )}
      {!listData.sent &&
        listData?.proposal_votes > listData?.lp?.total_assets / 2 && (
          <Button
            onClick={() =>
              sendProposal(listData.lp.pool_pubkey, listData.proposal_pubkey)
            }
            size="mini"
            shape="rounded"
            color="info"
          >
            Send
          </Button>
        )}
    </div>
  );
};

interface VoteTableProps {
  data: any[];
  insurance: any;
  getProposals: any;
}

const VoterTable: React.FC<VoteTableProps> = ({
  data,
  insurance,
  getProposals,
}) => {
  return (
    <div className="flex w-full flex-col p-4 px-8">
      <div className="mb-5 grid w-full grid-cols-5 gap-3 text-sm font-semibold xl:text-base 3xl:text-lg">
        <div className="px-4">Pool Name</div>
        <div className="px-4 text-center">Commission</div>
        <div className="px-4 text-center">Undercollaterization</div>
        <div className="px-4 text-center">Votes</div>
        <div className="px-4 text-center">Status</div>
      </div>
      {data.length === 0 && (
        <div className="my-6 w-full text-center text-lg xl:text-xl 3xl:text-2xl">
          No Data
        </div>
      )}
      {data.length > 0 &&
        data.map((item) => {
          return (
            <VoterTableList
              insurance={insurance}
              listData={item}
              getProposals={getProposals}
              key={item.proposal_pubkey}
            />
          );
        })}
    </div>
  );
};

export default VoterTable;
