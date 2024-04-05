import React from 'react';

interface HeaderLandingProps {}

export const HeaderLanding: React.FC<HeaderLandingProps> = ({}) => {
  return (
    <div className="z-[20] mt-16 flex w-screen flex-col items-center">
      <div className="text-center text-5xl font-black text-white 2xl:text-6xl">
      Insure Your Codebase <br/> Against Exploits 
      </div>
      <div className="mt-10 text-center text-lg font-medium text-gray-400 xl:text-xl 3xl:text-2xl">
      Compensate your users for monetary and data losses due to unforeseen bugs in your code
      </div>
      <div className="mt-12">
      </div>
    </div>
  );
};

export default HeaderLanding;
