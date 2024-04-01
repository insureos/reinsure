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

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);

export const getInsuranceProgram = async (
  connection: web3.Connection,
  signerWallet: any
) => {
  const provider = new AnchorProvider(connection, signerWallet, {});
  const program: Program<Insurance> = new Program(
    IDL,
    contractAddresses.insurance,
    provider
  );
  return program;
};

export const get_pda_from_seeds = async (seeds: any, program: any) => {
  return await web3.PublicKey.findProgramAddressSync(seeds, program.programId);
};

export const get_metadata_account= async (mintKeypair: any) => {
  return (
    await web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
}