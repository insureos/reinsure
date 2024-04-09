import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';

import {
  addSecurity,
  getLpTokenBalance,
} from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';
import { useWallet } from '@solana/wallet-adapter-react';
interface PoolListTypes {
  data: any;
  setTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const PoolList: React.FC<PoolListTypes> = ({ data, setTrigger }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [usdcAmt, setUsdcAmt] = useState(0);
  const [usdtAmt, setUsdtAmt] = useState(0);

  const [balance, setBalance] = useState(0);

  // const setFrom = from as CoinList;
  // const setTo = to as CoinList;
  const dispatch = useAppDispatch();

  const wallet = useWallet();

  const getTokenAccBal = async () => {
    if (wallet.publicKey === null) return;
    await getLpTokenBalance(wallet.publicKey, new PublicKey(data.pool_pubkey))
      .then((res: any) => {
        const bal = res.amount / 10 ** res.decimals;
        setBalance(bal);
      })
      .catch((e) => console.log(e));
  };

  const addSec = async (amount: number) => {
    if (wallet.publicKey === null || amount === 0) return;

    dispatch(onLoading('Add Security...'));
    await addSecurity(wallet.publicKey, new PublicKey(data.pool_pubkey), amount)
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
        setTrigger((trigger) => trigger + 1);
        setUsdcAmt(0);
        setUsdtAmt(0);
        getTokenAccBal();
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

  useEffect(() => {
    getTokenAccBal();
  }, []);

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-light-dark shadow-card transition-all last:mb-0 hover:shadow-large">
      <div
        onClick={() => setIsExpand(!isExpand)}
        className="relative grid h-auto cursor-pointer grid-cols-5 items-center gap-3 py-4 sm:h-20 sm:gap-6 sm:py-0"
      >
        <div className="px-4 text-center text-xs font-medium tracking-wider text-white xl:text-sm 3xl:text-base">
          {/* <CurrencySwapIcons from={setFrom} to={setTo} /> */}
          {data.pool_name}
        </div>
        <div className="px-4 text-center text-xs font-medium tracking-wider text-white xl:text-sm 3xl:text-base">
          {data.target_pool_size / 10 ** 6}
        </div>
        <div className="px-4 text-center text-xs font-medium tracking-wider text-white xl:text-sm 3xl:text-base">
          {data.current_pool_size / 10 ** 6}
        </div>
        <div className="px-4 text-center text-xs font-medium tracking-wider text-white xl:text-sm 3xl:text-base">
          {data.overcapitalization_ratio}
        </div>
        <div className="px-4 text-center text-xs font-medium tracking-wider text-white xl:text-sm 3xl:text-base">
          {new Date(data.pool_lifecycle).toDateString()}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExpand && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex flex-col gap-4 border-t border-dashed border-gray-700 px-4 py-4">
              <div className="flex gap-4">
                <div className="flex gap-3 text-sm xl:text-base 3xl:text-lg">
                  <div>Tokens Owned: </div>
                  <div className="font-semibold">{balance}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex w-full items-center gap-2">
                  <Input
                    type="number"
                    value={usdcAmt}
                    onChange={(e) => setUsdcAmt(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <Button
                    onClick={() => addSec(usdcAmt)}
                    shape="rounded"
                    color="info"
                    size="small"
                  >
                    Stake USDC
                  </Button>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Input
                    type="number"
                    value={usdtAmt}
                    onChange={(e) => setUsdtAmt(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <Button
                    onClick={() => addSec(usdtAmt)}
                    shape="rounded"
                    color="info"
                    size="small"
                  >
                    Stake USDT
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PoolList;
