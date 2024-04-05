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
import { hash } from '@project-serum/anchor/dist/cjs/utils/sha256';
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
  getOrCreateAssociatedTokenAccount,
  MintLayout,
  TOKEN_PROGRAM_ID,
  mintTo,
  createMint,
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

      const [lp] = await get_pda_from_seeds(
        [lpCreator.toBuffer(), Buffer.from('LP')],
        program
      );

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

      await program.methods
        .registerLp(
          new BN(idealSize * 10 ** 6),
          new BN(poolLifecycle / 1000),
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

      const expiryTime = (new Date().getTime() + expiry) / 1000;

      const data1 = {
        insuranceCreator: insuranceCreator,
        coverage: coverage,
        premium: premium,
        minimumCommission: minimumCommission,
        deductible: deductible,
        expiry: expiryTime,
        insuranceMetadataLink: insuranceMetadataLink,
      };
      const txt = JSON.stringify(data1);
      const insuranceId = hash(txt).slice(0, 32);

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
          new BN(deductible),
          new BN(expiryTime),
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

export const proposeProposal = (
  proposalProposer: PublicKey,
  lp: PublicKey,
  insurance: PublicKey,
  proposedCommission: number,
  proposedUndercollaterization: number,
  proposalMetadataLink: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const data1 = {
        lp: lp,
        insurance: insurance,
        proposedCommission: proposedCommission,
        proposedUndercollaterization: proposedUndercollaterization,
        proposalMetadataLink: proposalMetadataLink,
      };
      console.log(data1);
      const txt = JSON.stringify(data1);
      const proposalId = hash(txt).slice(0, 16);

      const [proposal] = await get_pda_from_seeds(
        [lp.toBuffer(), insurance.toBuffer(), Buffer.from(proposalId)],
        program
      );

      const [tokenisedMint] = await get_pda_from_seeds(
        [
          Buffer.from('i_am_in_love'),
          Buffer.from('withacriminl'),
          lp.toBuffer(),
        ],
        program
      );

      const proposalTokenAccount = await getAssociatedTokenAddress(
        tokenisedMint,
        proposal,
        true
      );

      await program.methods
        .proposeInsuranceProposal(
          proposalId,
          proposalMetadataLink,
          new BN(proposedCommission),
          new BN(proposedUndercollaterization)
        )
        .accounts({
          proposalProposer: proposalProposer,
          lp: lp,
          insurance: insurance,
          proposal: proposal,
          tokenisedMint: tokenisedMint,
          proposalTokenAccount: proposalTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: true, maxRetries: 3 })
        .then((res) => {
          resolve(proposal);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const getLpTokenBalance = (Addr: PublicKey, lp: PublicKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [tokenisedMint] = await get_pda_from_seeds(
        [
          Buffer.from('i_am_in_love'),
          Buffer.from('withacriminl'),
          lp.toBuffer(),
        ],
        program
      );

      const tokenAccount = await getAssociatedTokenAddress(
        tokenisedMint,
        Addr,
        true
      );

      await Connection.getTokenAccountBalance(tokenAccount)
        .then((res) => {
          resolve(res.value);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const addSecurity = (
  securityAddr: PublicKey,
  lp: PublicKey,
  amount: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

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

      const mintAddress = new PublicKey(
        '9z6gCi1qjiv599YXS1EYtSvbWGQtcV67PnBk1GfrF3RF'
      );

      const securityAddrUSDCAccount = await getAssociatedTokenAddress(
        mintAddress,
        securityAddr,
        true
      );

      const LpUSDCAccount = await getAssociatedTokenAddress(
        mintAddress,
        lp,
        true
      );

      const securityAdrrTokenAccount = await getAssociatedTokenAddress(
        tokenisedMint,
        securityAddr,
        true
      );

      await program.methods
        .addSecurity(new BN(amount * 10 ** 6))
        .accounts({
          securityAddr: securityAddr,
          securityAddrUsdcAcc: securityAddrUSDCAccount,
          securityAdderTokenAddr: securityAdrrTokenAccount,
          securityMint: securityMint,
          lp: lp,
          tokenisedMint: tokenisedMint,
          lpUsdcAccount: LpUSDCAccount,
          usdcMint: mintAddress,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .rpc({ skipPreflight: true, maxRetries: 3 })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const voteOnProposal = (
  securityAddr: PublicKey,
  lp: PublicKey,
  insurance: PublicKey,
  proposal: PublicKey,
  amount: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [tokenisedMint] = await get_pda_from_seeds(
        [
          Buffer.from('i_am_in_love'),
          Buffer.from('withacriminl'),
          lp.toBuffer(),
        ],
        program
      );

      const securityAdrrTokenAccount = await getAssociatedTokenAddress(
        tokenisedMint,
        securityAddr,
        true
      );

      const [voteProposalAccount] = await get_pda_from_seeds(
        [Buffer.from('vote'), proposal.toBuffer(), securityAddr.toBuffer()],
        program
      );

      const voteProposalTokenAccount = await getAssociatedTokenAddress(
        tokenisedMint,
        voteProposalAccount,
        true
      );

      await program.methods
        .voteInsuranceProposal(new BN(amount * 10 ** 6))
        .accounts({
          voter: securityAddr,
          voterTokenAccount: securityAdrrTokenAccount,
          tokenisedMint: tokenisedMint,
          voteProposalAccount: voteProposalAccount,
          voteProposalTokenAccount: voteProposalTokenAccount,
          insurance: insurance,
          proposal: proposal,
          lp: lp,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: true, maxRetries: 3 })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const sendAcceptProposal = (
  notifier: PublicKey,
  lp: PublicKey,
  proposal: PublicKey
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      await program.methods
        .acceptProposal()
        .accounts({
          notifier: notifier,
          lp: lp,
          proposal: proposal,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const AcceptInsuranceProposal = (
  insuranceCreator: PublicKey,
  insurance: PublicKey,
  lp: PublicKey,
  proposal: PublicKey
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      await program.methods
        .acceptReinsuranceProposal()
        .accounts({
          insuranceCreator: insuranceCreator,
          insurance: insurance,
          lp: lp,
          proposal: proposal,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const PayPremium = (
  insuranceCreator: PublicKey,
  insurance: PublicKey,
  lp: PublicKey,
  proposal: PublicKey
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const program = await getInsuranceProgram(Connection, Signer);

      const [premiumVault] = await get_pda_from_seeds([
        Buffer.from('premium'),
        insurance.toBuffer(),
        proposal.toBuffer(),
      ],program);

      const mintAddress = new PublicKey(
        '9z6gCi1qjiv599YXS1EYtSvbWGQtcV67PnBk1GfrF3RF'
      );

      const premiumVaultTokenAccount = await getAssociatedTokenAddress(
        mintAddress,
        premiumVault,
        true
      );

      const insuranceCreatorUsdcAccount = await getAssociatedTokenAddress(
        mintAddress,
        insuranceCreator,
        true
      );

      await program.methods
        .payPremium(new BN(1))
        .accounts({
          insuranceCreator: insuranceCreator,
          insurance: insurance,
          premiumVault: premiumVault,
          premiumVaultTokenAccount: premiumVaultTokenAccount,
          insuranceCreatorUsdcAccount: insuranceCreatorUsdcAccount,
          proposal: proposal,
          lp: lp,
          usdcMint: mintAddress,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: false, maxRetries: 3 })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};