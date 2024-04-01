import { contractAddresses } from '@/config/addresses';
import { Insurance, IDL } from '@/types/idl/insurance';
import {
  Program,
  AnchorProvider,
  web3,
  Wallet,
  Idl,
  BN,
} from '@project-serum/anchor';
import {
  clusterApiUrl,
  Keypair,
  PublicKey,
  Transaction,
  ComputeBudgetProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Signer, Connection } from './wallet';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  TOKEN_METADATA_PROGRAM_ID,
  getInsuranceProgram,
  get_pda_from_seeds,
  get_metadata_account,
} from '@/lib/helpers/helper';

import axios from '@/lib/axiosClient';

export const registerInsurer = (
  insuranceCreator: PublicKey,
  description: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [insurer] = await get_pda_from_seeds(
        [insuranceCreator.toBuffer()],
        program
      );

      await program.methods
        .registerInsurer(description)
        .accounts({
          insuranceCreator: insuranceCreator,
          insurer: insurer,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
        .then((res) => {
          resolve(insurer);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const findInsurer = (insuranceCreator: PublicKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [insurer] = await get_pda_from_seeds(
        [insuranceCreator.toBuffer()],
        program
      );

      console.log(insurer.toString());

      await program.account.insurer
        .fetch(insurer)
        .then((res) => {
          resolve(true);
        })
        .catch((e) => {
          reject(false);
        });
    } catch (e) {
      reject(false);
    }
  });
};

export const registerLP = (
  lpCreator: PublicKey,
  idealSize: number,
  poolLifecycle: number,
  tokenName: string,
  tokenSymbol: string,
  tokenMetadata: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [lp] = await get_pda_from_seeds([lpCreator.toBuffer()], program);

      const [tokenisedMint] = await get_pda_from_seeds(
        [
          Buffer.from('i_am_in_love'),
          Buffer.from('withacriminl'),
          lp.toBuffer(),
        ],
        program
      );

      const securityMint = await getAssociatedTokenAddress(
        tokenisedMint,
        lp,
        true
      );

      const metadataAddress = await get_metadata_account(tokenisedMint);
      console.log(metadataAddress.toString(), securityMint.toString());

      await program.methods
        .registerLp(
          new BN(idealSize),
          new BN(poolLifecycle),
          tokenName,
          tokenSymbol,
          tokenMetadata
        )
        .accounts({
          lpCreator: lpCreator,
          lp: lp,
          tokenisedMint: tokenisedMint,
          securityMint: securityMint,
          metadata: metadataAddress,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: true, maxRetries: 3 })
        .then((res) => {
          resolve(lp);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const registerInsurance = (
  insuranceCreator: PublicKey,
  insuranceId: string,
  coverage: number,
  premium: number,
  minimumCommission: number,
  deductible: number,
  expiry: number,
  insuranceMetadataLink: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);
      const [insurer] = await get_pda_from_seeds(
        [insuranceCreator.toBuffer()],
        program
      );

      const [insurance] = await get_pda_from_seeds(
        [insuranceCreator.toBuffer(), Buffer.from(insuranceId)],
        program
      );

      console.log('in interact');

      await program.methods
        .registerInsurance(
          insuranceId,
          new BN(coverage),
          new BN(premium),
          new BN(minimumCommission),
          new BN(deductible),
          new BN(expiry),
          insuranceMetadataLink
        )
        .accounts({
          insuranceCreator: insuranceCreator,
          insurer: insurer,
          insurance: insurance,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
        .then((res) => {
          resolve(insurance);
        })
        .catch((e) => {
          console.log('insde catch');
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};