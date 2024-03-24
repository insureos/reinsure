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
import AnchorLink from '@/components/ui/links/anchor-link';

interface CreatePoolProps {}

const DurationOptions = [
  '1 Week',
  '2 Weeks',
  '1 Month',
  '3 Months',
  '6 Months',
  '9 Months',
  '1 Year',
];

const TargetSizeOptions = [
  100000, 200000, 400000, 600000, 800000, 1000000, 1500000,
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
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  Options: any[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  active,
  setActive,
  Options,
  placeholder = 'select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChoose = (option: any) => {
    setActive(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[15rem]">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#171E2E] px-6 py-3 text-xs hover:scale-[1.01] xl:text-sm 3xl:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          {active !== null && active !== 0 && active !== ''
            ? active
            : placeholder}
        </div>
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

const CreatePool: React.FC<CreatePoolProps> = ({}) => {
  const router = useRouter();
  const [poolName, setPoolName] = useState('');
  const [duration, setDuration] = useState('');
  const [targetSize, setTargetSize] = useState(0);
  const [additionalConstraints, setAdditionalConstraints] = useState('');

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div className="mb-5 flex w-full justify-between pr-5 text-xl font-bold xl:text-2xl 3xl:text-3xl">
        <div>Create Pool</div>
        <AnchorLink href="/open-pools">
          <XMarkIcon className="h-8 w-8" />
        </AnchorLink>
      </div>
      <div className="flex gap-20">
        <Input
          required
          label="Pool Name"
          className="w-[30rem]"
          placeholder="pool name"
          value={poolName}
          onChange={(e: any) => setPoolName(e.target.value)}
        />
      </div>

      <div className="flex gap-20">
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Pool Lifespan
          </div>
          <Dropdown
            active={duration}
            setActive={setDuration}
            Options={DurationOptions}
            placeholder="Choose Duration"
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Pool Target Size
          </div>
          <Dropdown
            active={targetSize}
            setActive={setTargetSize}
            Options={TargetSizeOptions}
            placeholder="Choose Target Size"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
          Maximum Acceptable Leverage
        </div>
        <RangeSlider />
      </div>
      <Textarea
        label="Additional Constraints"
        value={additionalConstraints}
        onChange={(e) => setAdditionalConstraints(e.target.value)}
      />
      <Button color="info" shape="rounded" size="small" className="mt-10 w-60">
        Create Pool
      </Button>
    </div>
  );
};

export default CreatePool;
