import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';

import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Slider from 'rc-slider';
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/button/button';
import cn from 'classnames';

import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';

import { uploadMetadataToIPFS } from '@/lib/helpers/metadata';
import {
  registerInsurance,
  registerInsurer,
  findInsurer,
} from '@/lib/helpers/contract-interact';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { PublicKey } from '@solana/web3.js';
import { onLoading, onFailure, onSuccess } from '@/store/callLoaderSlice';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { setSigner, setConnection } from '@/lib/helpers/wallet';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

interface Web3ProtocolProps {}

const DurationOptions = [
  '1 Week',
  '2 Weeks',
  '1 Month',
  '3 Months',
  '6 Months',
  '9 Months',
  '1 Year',
];

const durationMap: any = {
  '1 Week': 604800000,
  '2 Weeks': 1209600000,
  '1 Month': 2678400000,
  '3 Months': 7948800000,
  '6 Months': 15811200000,
  '9 Months': 23760000000,
  '1 Year': 31622400000,
};

interface DropdownProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  Options: string[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  active,
  setActive,
  Options,
  placeholder = 'select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChoose = (option: string) => {
    setActive(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[15rem]">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#171E2E] px-6 py-3 text-xs hover:scale-[1.01] xl:text-sm 3xl:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{active !== '' ? active : placeholder}</div>
        <ChevronDownIcon
          className={cn('h-5 w-5 transition-all', isOpen ? 'rotate-180' : '')}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-[115%] z-[10] flex w-[15rem] flex-col rounded-lg bg-gray-800 px-1 shadow-xl">
          {Options.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleChoose(item)}
                className="my-1 flex w-full cursor-pointer items-center justify-between rounded-lg px-6 py-2 text-xs hover:bg-gray-900 xl:text-sm 3xl:text-base"
              >
                {item}
                {active === item && <CheckIcon className="h-5 w-5" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const RangeSlider = () => {
  let [range, setRange] = useState({ min: 1, max: 100 });
  function handleRangeChange(value: any) {
    setRange({
      min: value[0],
      max: value[1],
    });
  }
  function handleMaxChange(max: number) {
    setRange({
      ...range,
      max: max || range.min,
    });
  }
  function handleMinChange(min: number) {
    setRange({
      ...range,
      min: min || 1,
    });
  }
  return (
    <div className="w-[40rem]">
      <div className="mb-5 grid grid-cols-2 gap-2">
        <Input
          label="min (1x)"
          type="number"
          value={range.min}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={range.max}
        />
        <Input
          label="max (100x)"
          type="number"
          value={range.max}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={range.min}
        />
      </div>
      <Slider
        range
        min={1}
        max={100}
        value={[range.min, range.max]}
        allowCross={false}
        onChange={(value: any) => handleRangeChange(value)}
      />
    </div>
  );
};

const chainOptions = ['Solana'];

interface AddressInputProps {
  setOutput: React.Dispatch<React.SetStateAction<any[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressInput: React.FC<AddressInputProps> = ({
  setOutput,
  setIsOpen,
}) => {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState(chainOptions[0]);

  const onAdd = () => {
    if (address === '') return;
    setOutput((prev) => [
      ...prev,
      {
        address: address,
        chain: chain,
      },
    ]);
    setAddress('');
    setIsOpen(false);
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex h-[18rem] w-[30rem] flex-col justify-between rounded-[1.5rem] bg-gray-900 p-6 shadow-xl"
      >
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          label="Address to be covered"
        />
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Duration
          </div>
          <Dropdown
            Options={chainOptions}
            active={chain}
            setActive={setChain}
          />
        </div>
        <Button onClick={onAdd} color="info" shape="rounded" size="small">
          Add
        </Button>
      </div>
    </div>
  );
};

interface RegisterInsurerProps {
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunc: () => void;
}

const RegisterInsurer: React.FC<RegisterInsurerProps> = ({
  desc,
  setDesc,
  setIsOpen,
  submitFunc,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
      <div className="flex h-[20rem] w-[32rem] flex-col justify-between rounded-[1.5rem] bg-gray-900 p-8 pt-5 shadow-xl">
        <div className="flex items-center justify-between text-lg font-bold xl:text-xl 3xl:text-2xl">
          <div>Register as Insurer</div>
          <WalletMultiButton className="rounded-full" />
        </div>
        <Textarea
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button color="info" onClick={submitFunc} shape="rounded" size="small">
          Register
        </Button>
      </div>
    </div>
  );
};

const Web3Protocol: React.FC<Web3ProtocolProps> = ({}) => {
  const router = useRouter();
  const [coverage, setCoverage] = useState(0);
  const [premium, setPremium] = useState(0);
  const [deductible, setDeductible] = useState(0);
  const [duration, setDuration] = useState('');
  const [redemptionPolicy, setRedemptionPolicy] = useState('');
  const [addressList, setAddressList] = useState<any[]>([]);
  const [addressModal, setAddressModal] = useState(false);

  const [registerModal, setRegisterModal] = useState(false);
  const [registerDesc, setRegisterDesc] = useState('');

  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const { connection } = useConnection();

  useLockBodyScroll(addressModal || registerModal);

  const checkRegistry = async () => {
    if (!wallet.publicKey) return;
    await findInsurer(wallet.publicKey)
      .then((res) => {
        if (res) {
          setRegisterModal(false);
        } else {
          setRegisterModal(true);
        }
      })
      .catch((e) => {
        if (!e) setRegisterModal(true);
      });
  };

  useEffect(() => {
    if (wallet.publicKey)
      setSigner(
        wallet.publicKey,
        wallet.signTransaction,
        wallet.signAllTransactions
      );
    if (connection) setConnection(connection);
  }, [wallet.publicKey, connection]);

  useEffect(() => {
    if (wallet.publicKey) {
      checkRegistry();
    }
  }, [wallet.publicKey]);

  const registerInsurerFunc = async () => {
    if (registerDesc === '') return;
    if (!wallet.publicKey) return;
    setRegisterModal(false);
    dispatch(onLoading('Registering Insurer...'));

    await registerInsurer(wallet.publicKey, registerDesc)
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Insurer Registration Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/account/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Insurer Registration Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
        setRegisterModal(true);
      });
  };

  const registerInsuranceFunc = async () => {
    if (!wallet.publicKey) return;
    if (
      coverage === 0 ||
      premium === 0 ||
      deductible === 0 ||
      redemptionPolicy === '' ||
      duration === ''
    )
      return;
    dispatch(onLoading('Registering Insurance...'));

    const durationSecs = durationMap[duration];
    const metadataHash = await uploadMetadataToIPFS({
      coverage: coverage,
      premium: premium,
      deductible: deductible,
      duration: durationSecs,
      redemptionPolicy: redemptionPolicy,
    });

    console.log(durationSecs);

    await registerInsurance(
      wallet.publicKey,
      '1',
      coverage,
      premium,
      1,
      deductible,
      durationSecs,
      `https://ipfs.io/ipfs/${metadataHash}`
    )
      .then((res) => {
        dispatch(
          onSuccess({
            label: 'Insurance Registration Success',
            description: 'check out tx at',
            link: res
              ? `https://solscan.io/account/${res.toString()}?cluster=devnet`
              : '',
            redirect: null,
          })
        );
      })
      .catch((err) => {
        dispatch(
          onFailure({
            label: 'Insurance Registration Failed',
            description: err.message,
            link: '',
            redirect: null,
          })
        );
      });
  };

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      {!wallet.publicKey && !registerModal && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
          <div className="flex h-[10rem] w-[24rem] flex-col justify-between rounded-[1.5rem] bg-gray-900 p-8 shadow-xl">
            <div className="text-base xl:text-lg 3xl:text-xl">
              Connect Wallet to continue
            </div>
            <WalletMultiButton className="rounded-full" />
          </div>
        </div>
      )}
      <div className="mb-5 text-xl font-bold xl:text-2xl 3xl:text-3xl">
        Web3 Protocol
      </div>
      {registerModal && (
        <RegisterInsurer
          desc={registerDesc}
          setDesc={setRegisterDesc}
          setIsOpen={setRegisterModal}
          submitFunc={registerInsurerFunc}
        />
      )}
      <div className="flex gap-20">
        <Input
          required
          label="Coverage Amount (in $)"
          type="number"
          className="w-[30rem]"
          value={coverage}
          onChange={(e: any) => setCoverage(e.target.value)}
        />
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Duration
          </div>
          <Dropdown
            active={duration}
            setActive={setDuration}
            Options={DurationOptions}
            placeholder="Choose Duration"
          />
        </div>
      </div>
      {/* <div className="my-5 flex flex-col">
        <div className="mb-2 flex items-center gap-5  sm:mb-3">
          <div className="text-xs uppercase tracking-widest text-gray-100 sm:text-sm">
            Protocol Addresses to be covered -
          </div>
          <Button
            onClick={() => setAddressModal(true)}
            color="info"
            className="w-fit"
            shape="pill"
            size="mini"
          >
            Add
          </Button>
          {addressModal && (
            <AddressInput
              setOutput={setAddressList}
              setIsOpen={setAddressModal}
            />
          )}
        </div>
        {addressList.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                console.log(idx);
                const newList = [
                  ...addressList.slice(0, idx),
                  ...addressList.slice(idx + 1),
                ];
                console.log(newList);
                setAddressList(newList);
              }}
              className="group mb-2 grid w-[45rem] cursor-pointer grid-cols-4 rounded-lg  px-5 py-2 hover:bg-gray-800"
            >
              <div className="col-span-3">{item.address}</div>
              <div className="flex w-full items-center justify-between">
                {item.chain}
                <XMarkIcon className="h-5 w-5 text-red-500 opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </div>
          );
        })}
      </div> */}
      <Textarea
        label="Redemption Policy"
        value={redemptionPolicy}
        onChange={(e) => setRedemptionPolicy(e.target.value)}
      />
      <div className="flex items-end gap-10">
        <Input
          required
          label="Premium (in $)"
          type="number"
          className="w-[30rem]"
          value={premium}
          onChange={(e: any) => setPremium(e.target.value)}
        />
        <Button color="primary" shape="rounded" size="small">
          Auto Calculate
        </Button>
      </div>
      <div className="flex items-end gap-10">
        <Input
          required
          label="Deductible (in $)"
          type="number"
          className="w-[30rem]"
          value={deductible}
          onChange={(e: any) => setDeductible(e.target.value)}
        />
      </div>
      {/* <div className="mt-3 flex flex-col">
        <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
          Maximum Bidder Leverage
        </div>
        <RangeSlider />
      </div> */}
      <Button
        color="info"
        onClick={registerInsuranceFunc}
        shape="rounded"
        size="small"
        className="mt-10 w-60"
      >
        Register
      </Button>
    </div>
  );
};

export default Web3Protocol;
