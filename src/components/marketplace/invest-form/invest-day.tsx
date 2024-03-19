'use client';

// static data
import { investFormData } from '@/data/static/trading-data';

import cn from 'classnames';
import { useState } from 'react';
import { Listbox } from '@/components/ui/listbox';
import InputLabel from '@/components/ui/input-label';
import { Transition } from '@/components/ui/transition';

// import icons
import { ChevronDown } from '@/components/icons/chevron-down';

export default function InvestDay() {
  let [state, setState] = useState(investFormData[0]);
  return (
    <div>
      <InputLabel
        className="!mb-2 sm:!mb-3"
        titleClassName="!capitalize !font-normal"
        title="Invest Every"
      />
      <div className="relative">
        <Listbox value={state} onChange={setState}>
          <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border px-4 text-sm font-medium outline-none transition-shadow duration-200 hover:ring-1 border-gray-700 bg-light-dark text-gray-100 hover:border-gray-600 hover:ring-gray-600 sm:h-12 sm:px-5">
            <div className="flex items-center">{state.name}</div>
            <ChevronDown />
          </Listbox.Button>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border p-1 shadow-large outline-none border-gray-700 bg-light-dark xs:p-2">
              {investFormData.map((option) => (
                <Listbox.Option key={option.id} value={option}>
                  {({ selected }) => (
                    <div
                      className={cn(
                        'flex cursor-pointer items-center rounded-md px-3 py-2 text-sm transition text-gray-100',
                        selected
                          ? 'font-medium bg-gray-600/60'
                          : 'hover:bg-gray-700/70',
                      )}
                    >
                      {option.name}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
}
