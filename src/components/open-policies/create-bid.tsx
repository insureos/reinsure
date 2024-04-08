import { useState, useEffect } from 'react';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import cn from 'classnames';
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';


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
        <div>{active !== null ? active.pool_name : placeholder}</div>
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
                {item.pool_name}
                {active !== null && active.pool_pubkey === item.pool_pubkey && (
                  <CheckIcon className="h-5 w-5" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface CreateBidProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunc: any;
  poolsData: any[];
}

const CreateBid: React.FC<CreateBidProps> = ({
  setIsOpen,
  submitFunc,
  poolsData,
}) => {
  const [currPool, setCurrPool] = useState<any>(null);
  const [commission, setCommission] = useState(0);
  const [undercollaterization, setUndercollaterization] = useState(0);
  const [policyDetails, setPolicyDetails] = useState('');
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
      <div className="flex h-[35rem] w-[40rem] flex-col justify-between rounded-[1.5rem] bg-gray-900 p-8 pt-5 shadow-xl">
        <div className="flex w-full justify-between">
          <div className="text-base font-semibold xl:text-lg 3xl:text-xl">
            Create Bid
          </div>
          <XMarkIcon className="h-8 w-8" onClick={() => setIsOpen(false)} />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-100 sm:mb-3 sm:text-sm">
            Select Pool
          </div>
          <Dropdown
            active={currPool}
            setActive={setCurrPool}
            Options={poolsData}
            placeholder="Choose Pool"
          />
        </div>
        <Input
          type="number"
          placeholder="enter commission"
          label="Commission ( in % )"
          value={commission}
          onChange={(e) => {
            setCommission(parseFloat(e.target.value));
          }}
        />
        <Input
          type="number"
          placeholder="enter Undercollaterization"
          label="Undercollaterization ( in % )"
          value={undercollaterization}
          onChange={(e) => {
            setUndercollaterization(parseFloat(e.target.value));
          }}
        />
        <Textarea
          placeholder="policy payout details"
          label="Policy Payout Details"
          value={policyDetails}
          onChange={(e) => {
            setPolicyDetails(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (currPool === null) return;
            submitFunc(
              currPool.pool_pubkey,
              commission,
              undercollaterization,
              policyDetails
            );
          }}
          shape="rounded"
          size="small"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateBid;