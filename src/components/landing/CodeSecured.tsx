import React from 'react';
import Image from '@/components/ui/image';
import CodeSecuredImage from '@/assets/images/CodeSecuredImage.png';

interface CodeSecuredProps {}

export const CodeSecured: React.FC<CodeSecuredProps> = ({}) => {
  return (
    <div className="flex justify-between bg-[#060606] py-32" id="codeSecured">
      <div className="flex flex-col gap-8 pl-32 mr-80">
        <div className="text-5xl font-black text-white 2xl:text-6xl">
        Your Codebase,
          <br /> Secured.
        </div>
        <div className="text-base text-gray-400 xl:text-lg 3xl:text-xl">
        <span className="text-white">Measure. </span>
          The estimated value of capital/business value that could <br/>
          be compromised by codebase vulnerabilities.
        </div>
        <div className="text-base text-gray-400 xl:text-lg 3xl:text-xl">
          <span className="text-white">Monitor. </span> Different risk metrics in real-time across programming <br/> 
          languages, development stacks.
        </div>
        <div className="text-base text-gray-400 xl:text-lg 3xl:text-xl">
          <span className="text-white">Mitigate. </span> Risk by paying your premium to coverage pools. <br/>
          These pools then deploy money optimally to reduce probabilities of exploits.
        </div>
        <div className="text-base text-gray-400 xl:text-lg 3xl:text-xl">
          <span className="text-white">Claim. </span> Compensation against lost business value due to codebase vulnerabilities.
        </div>
      </div>
      <div className="conic-gradient-1 flex w-[35rem] rounded-l-2xl py-10 xl:w-[40rem] 3xl:w-[45rem]">
        <Image
          width={0}
          height={0}
          alt="screen"
          style={{ width: '100%', height: 'auto' }} // optional
          sizes="100vw"
          src={CodeSecuredImage}
        />
      </div>
    </div>
  );
};

export default CodeSecured;
