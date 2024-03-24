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

interface CreateOracleProps {}

const CreateOracle: React.FC<CreateOracleProps> = ({}) => {
  const router = useRouter();
  const [oracleName, setOracleName] = useState('');
  const [srcApiUrl, setSrcApiUrl] = useState('');

  const [description, setDescription] = useState('');

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div className="mb-5 flex w-full justify-between pr-5 text-xl font-bold xl:text-2xl 3xl:text-3xl">
        <div>Create Oracle</div>
        <AnchorLink href="/insurance-risk">
          <XMarkIcon className="h-8 w-8" />
        </AnchorLink>
      </div>
      <div className="flex gap-20">
        <Input
          required
          label="Oracle Name"
          className="w-[30rem]"
          placeholder="oracle name"
          value={oracleName}
          onChange={(e: any) => setOracleName(e.target.value)}
        />
        <Input
          required
          label="Source API URL"
          className="w-[30rem]"
          placeholder="Source API URL"
          value={srcApiUrl}
          onChange={(e: any) => setSrcApiUrl(e.target.value)}
        />
      </div>
      <Textarea
        label="Connect Raw Data"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button color="info" shape="rounded" size="small" className="mt-10 w-60">
        Create Oracle
      </Button>
    </div>
  );
};

export default CreateOracle;
