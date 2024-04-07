import React from 'react';
import Image from '@/components/ui/image';
import CodeSecuredImage from '@/assets/images/CodeSecuredImage.png';

interface RiskManagementProps {}

export const RiskManagement: React.FC<RiskManagementProps> = ({}) => {
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-6 bg-[#181E2D] py-32" id="riskManagment">
      <div className="text-4xl font-black tracking-tight text-white 2xl:text-5xl">
      Best in class risk-management for codebases
      </div>
      <div className="text-center text-base text-gray-400 xl:text-lg 3xl:text-xl">
      Stream premium money to different risk mitigation strategies based on milestones. <br/>
      Attach relevant risk oracles seamlessly to those metrics, monitor changes and <br/>
      increase capital deployment for most critical vulnerabilities.
      </div>
      <div className="conic-gradient-2 flex w-[55rem] items-end rounded-2xl p-16 pb-0 xl:w-[60rem] 3xl:w-[65rem]">
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

export default RiskManagement;
