// Profile Wallet Data
import Wallet from '@/assets/images/portfolio/wallet.svg';
import Nft from '@/assets/images/portfolio/nft.svg';
import Deposit from '@/assets/images/portfolio/deposit.svg';
import Claimable from '@/assets/images/portfolio/claimable.svg';
export const authorWallets = [
  {
    id: 1,
    name: 'WALLET',
    logo: Wallet,
    balance: '$2,518.78',
  },
  {
    id: 2,
    name: 'POLICY TOKENS',
    logo: Nft,
    balance: '$152.00',
  },
  {
    id: 3,
    name: 'UNCLAIMED PREMIUMS',
    logo: Deposit,
    balance: '$2,215.43',
  },
  {
    id: 4,
    name: 'CLAIMS',
    logo: Claimable,
    balance: '$150.60',
  },
];

// Profile Protocols Data
import PooltoGether from '@/assets/images/portfolio/poolto-gether.svg';
import Uniswap from '@/assets/images/portfolio/uniswap.svg';
import Pancake from '@/assets/images/portfolio/pancake.svg';
import Curve from '@/assets/images/portfolio/curve.svg';

export const authorProtocols = [
  {
    id: 1,
    name: 'POOLTOGETHER',
    coinType: 'Ethereum',
    logo: PooltoGether,
    balance: '$2,215.43',
  },
  {
    id: 2,
    name: 'CURVE',
    coinType: 'Ethereum',
    logo: Curve,
    balance: '$2,215.43',
  },
  {
    id: 3,
    name: 'UNISWAP',
    coinType: 'Ethereum',
    logo: Uniswap,
    balance: '$2,215.43',
  },
  {
    id: 4,
    name: 'PANCAKE SWAP',
    coinType: 'BSC',
    logo: Pancake,
    balance: '$2,215.43',
  },
];

// Profile Protocols Data
import Bitcoin from '@/assets/images/currency/bitcoin.svg';
import Ethereum from '@/assets/images/currency/ethereum.svg';
import USDC from '@/assets/images/coin/usd-coin-usdc-logo.svg';
import USDT from '@/assets/images/coin/tether-usdt-logo.svg';

export const authorNetworks = [
  {
    id: 1,
    name: 'BTC',
    logo: Bitcoin,
    balance: '$2,518.78',
  },
  {
    id: 2,
    name: 'ETH',
    logo: Ethereum,
    balance: '$152.00',
  },
];

// Author Transaction History Data
import User1 from '@/assets/images/avatar/user-1.png';
import User2 from '@/assets/images/avatar/user-2.png';

export const transactionHistory = [
  {
    id: 1,
    name: 'Insurance1 INSR',
    avatar: User2,
    date: 'February 7, 2022',
    time: '10:13 AM',
    transactionType: 'sell',
    transactionFrom: 'Stefen365',
    transactionFromAvatar: User1,
    transactionMethodLogo: USDC,
    transactionMethod: 'USDC',
    transactionAmount: 205,
    exchangeRate: "2.1 USDT/INSR",
  },
  {
    id: 2,
    name: 'StrInsurance STR',
    avatar: User2,
    date: 'February 7, 2022',
    time: '10:13 AM',
    transactionType: 'debitbuyed',
    transactionFrom: 'Stefen365',
    transactionFromAvatar: User1,
    transactionMethodLogo: USDT,
    transactionMethod: 'USDT',
    transactionAmount: 150,
    exchangeRate: "1.57 USDT/STR",
  },
  {
    id: 3,
    name: 'HelloWorld Re-assurance HWR',
    avatar: User2,
    date: 'February 7, 2022',
    time: '10:13 AM',
    transactionType: 'sell',
    transactionFrom: 'Stefen365',
    transactionFromAvatar: User1,
    transactionMethodLogo: USDC,
    transactionMethod: 'USDC',
    transactionAmount: 610,
    exchangeRate: "1.8 USDT/HWR",
  },
];
