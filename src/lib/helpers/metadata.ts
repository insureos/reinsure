import axios from '@/lib/axiosClient';
const jwt = process.env.IPFS_JWT as string;
import { Metaplex } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { getMint, getAssociatedTokenAddress } from '@solana/spl-token';
import { Signer } from './wallet';

export const uploadFileToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const auth =
    'Basic ' +
    Buffer.from(
      process.env.NEXT_PUBLIC_INFURA_IPFS_API_KEY +
        ':' +
        process.env.NEXT_PUBLIC_INFURA_IPFS_API_SECRET
    ).toString('base64');

  const resFile = await axios({
    method: 'post',
    url: 'https://ipfs.infura.io:5001/api/v0/add',
    data: formData,
    headers: {
      authorization: auth,
    },
  });
  return resFile.data.Hash;
};

export const uploadMetadataToIPFS = async (metadata: any) => {
  const formData = new FormData();
  formData.append('file', JSON.stringify(metadata));

  const auth =
    'Basic ' +
    Buffer.from(
      process.env.NEXT_PUBLIC_INFURA_IPFS_API_KEY +
        ':' +
        process.env.NEXT_PUBLIC_INFURA_IPFS_API_SECRET
    ).toString('base64');

  const res = await axios({
    method: 'post',
    url: 'https://ipfs.infura.io:5001/api/v0/add',
    headers: {
      authorization: auth,
    },
    data: formData,
  });
  return res.data.Hash;
};
