'use client';

// static data
import { coinChangeData } from '@/data/static/trading-data';

import cn from 'classnames';
import { Fragment, useState } from 'react';
import Input from '@/components/ui/forms/input';
import SimpleBar from '@/components/ui/simplebar';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';

// import icons
import { ChevronDown } from '@/components/icons/chevron-down';

export default function CoinChange() {
  const [selected, setSelected] = useState(coinChangeData[0]);

  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="flex items-center gap-3 rounded-full bg-light-dark p-2 py-1.5 pr-6">
            {selected.icon}
            <span className="inline-block">
              <p className="text-xs font-medium uppercase text-white xl:text-sm 3xl:text-base">
                {selected.title}/ustd
              </p>
              <p className="text-2xs text-left capitalize text-gray-300 xl:text-xs 3xl:text-sm">
                {selected.name}
              </p>
            </span>
            <span className=" ml-2 text-gray-500">
              <ChevronDown className="h-auto w-3" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute -left-3 top-full z-20 mt-1 w-[300px] rounded-lg border border-gray-700 bg-light-dark pb-4 shadow-main min-[375px]:left-0 min-[375px]:w-[320px] sm:w-[400px] sm:pb-6">
              <div className="p-4 pb-0 sm:p-6 sm:pb-0">
                <Input
                  placeholder="Search..."
                  autoComplete="off"
                  inputClassName="border-[#E2E8F0] !bg-light-dark appearance-none placeholder:!text-[#4B5563] !text-gray-200 !mt-0"
                />
                <div className="text-2xs grid grid-cols-12 items-center py-5 font-normal text-gray-500 xl:text-xs 3xl:text-sm">
                  <p className="col-span-3">Pair</p>
                  <p className="col-span-4 text-center">Price</p>
                  <p className="col-span-3 text-center">24H</p>
                  <p className="col-span-2 text-end">Vol</p>
                </div>
              </div>
              <SimpleBar style={{ height: 446 - 156 }} className="px-2">
                {coinChangeData.map((coin) => (
                  <Listbox.Option
                    key={`coin-data-${coin.id}`}
                    className="text-2xs grid cursor-pointer grid-cols-12 items-center gap-1 rounded-lg px-2 py-4 hover:bg-gray-600/60 sm:px-4 xl:text-xs 3xl:text-sm"
                    value={coin}
                  >
                    <p className="col-span-3 flex items-center gap-2 font-medium uppercase text-gray-300">
                      {coin.icon}
                      <span>{coin.title}</span>
                    </p>
                    <p
                      className={cn(
                        'col-span-4 text-center font-normal',
                        coin.inCrease ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {coin.price}
                    </p>
                    <p
                      className={cn(
                        'col-span-3 text-center font-normal',
                        coin.inCrease ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {coin.priceUpDown}
                    </p>
                    <p className="col-span-2 text-end font-normal text-gray-500">
                      {coin.vol}
                    </p>
                  </Listbox.Option>
                ))}
              </SimpleBar>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
