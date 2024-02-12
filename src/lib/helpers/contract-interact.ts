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
} from '@/lib/helpers/helper';

import axios from '@/lib/axiosClient';

export const registerInsurer = (insuranceCreator: PublicKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [insurer] = await get_pda_from_seeds(
        [insuranceCreator.toBuffer()],
        program
      );

      await program.methods
        .registerInsurer('')
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

export const registerLP = (lpCreator: PublicKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [lp] = await get_pda_from_seeds([lpCreator.toBuffer()], program);

      await program.methods
        .registerLp()
        .accounts({
          lpCreator: lpCreator,
          lp: lp,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
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
  insuranceId:string,
  coverage:number,
  premium:number,
  minimumCommission:number,
  deductible:number,
  expiry:number,
  insuranceMetadataLink:string
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

      await program.methods
        .registerInsurance(
          insuranceId,
          new BN(coverage),
          new BN(premium),
          new BN(minimumCommission),
          deductible,
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
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const sendInsuranceProposal = (
  lpCreator: PublicKey,
  insurance: PublicKey,
  proposedCommision:number,
  proposeduUndercollaterization:number,
  proposalMetadataLink:string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);
      const [lp] = await get_pda_from_seeds([lpCreator.toBuffer()], program);

      const [proposal] = await get_pda_from_seeds(
        [lpCreator.toBuffer(), insurance.toBuffer()],
        program
      );

      await program.methods
        .sendInsuranceProposal(
          new BN(proposedCommision),
          new BN(proposeduUndercollaterization),
          proposalMetadataLink
        )
        .accounts({
          lpCreator: lpCreator,
          lp: lp,
          insurance: insurance,
          proposal: proposal,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
        .then((res) => {
          resolve(insurance);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};
