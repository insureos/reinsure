import React, { Fragment, useState } from 'react';
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

const Web3Protocol: React.FC<Web3ProtocolProps> = ({}) => {
  const router = useRouter();
  const [duration, setDuration] = useState('');
  const [addressList, setAddressList] = useState<any[]>([]);
  const [addressModal, setAddressModal] = useState(false);

  useLockBodyScroll(addressModal);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div className="mb-5 text-xl font-bold xl:text-2xl 3xl:text-3xl">
        Web3 Protocol
      </div>
      <div className="flex gap-20">
        <Input
          required
          label="Coverage Amount (in $)"
          type="number"
          className="w-[30rem]"
          value={0}
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
      <div className="my-5 flex flex-col">
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
      </div>
      <Textarea label="Redemption Policy" />
      <div className="flex items-end gap-10">
        <Input
          required
          label="Premium (in $)"
          type="number"
          className="w-[30rem]"
          value={0}
        />
        <Button color="primary" shape="rounded" size="small">
          Auto Calculate
        </Button>
      </div>
      <div className="mt-3 flex flex-col">
        <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
          Maximum Bidder Leverage
        </div>
        <RangeSlider />
      </div>
    </div>
  );
};

export default Web3Protocol;
