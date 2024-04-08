import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';
import VoteDetailsCard from '@/components/claim-payouts/vote-details/vote-details-card';
// static data
import votePool from '@/assets/images/vote-pool.svg';
import axios from '@/lib/axiosClient';

const tabItemClassName =
  'flex-1 justify-center capitalize text-gray-600 [&>span:first-child]:relative [&>span:first-child]:z-10 [&>span:first-child]:justify-center [&>span:first-child]:px-5 [&>span:first-child]:text-white [&>span:nth-of-type(2)]:top-1.5 [&>span:nth-of-type(2)]:z-0 [&>span:nth-of-type(2)]:h-[calc(100%-12px)] [&>span:nth-of-type(2)]:shadow-md [&>span:nth-of-type(2)]:bg-light-dark [&>span:only-child]:text-gray-300 [&>span]:overflow-hidden [&>span]:rounded-full';

interface ClaimPageProps {}

const ClaimPage: React.FC<ClaimPageProps> = ({}) => {

  const router = useRouter();

  const [claimsDataOngoing, setClaimsDataOngoing] = useState<any[]>([]);
  const [claimsDataOld, setClaimsDataOld] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const getClaimData = () => {
    setLoading(true);
    let config = {
      method: 'GET',
      url: 'https://api.insure-os.com/python/claim?page_no=1&page_size=20',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((res) => {
        const filterDataOngoing = res.data.filter(
          (items: any) => items.claim_accepted === false
        );
        const filterDataOld = res.data.filter(
          (items: any) => items.claim_accepted === true
        );
        setClaimsDataOngoing(filterDataOngoing);
        setClaimsDataOld(filterDataOld);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getClaimData();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1160px] text-sm ">
      <header
        className={cn(
          'mb-8 flex flex-col gap-4 rounded-lg bg-light-dark p-5 py-6 shadow-card xs:p-6 ',
          'sm:flex-row sm:items-center sm:justify-between'
        )}
      >
        <div className="flex items-start gap-4 xs:items-center xs:gap-3 xl:gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-dark">
            <Image alt="Vote Pool" src={votePool} width={32} height={32} />
          </div>
          <div>
            <h2 className="mb-2 font-medium  text-gray-100 xl:text-lg">
              Have you Faced a Security Exploit?
            </h2>
            <p className="leading-relaxed text-gray-400">
              You can file a claim for your insurance for evaluation by the LP
              token holders
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <Button
            shape="rounded"
            fullWidth={true}
            onClick={() => router.push(routes.createProposal)}
          >
            File a Claim
          </Button>
        </div>
      </header>
      <Tab.Group key="nested">
        <Tab.List className="relative mx-auto flex h-13 max-w-[450px] justify-between rounded-full bg-[#0C0F19] px-1.5 text-sm shadow-2xl min-[450px]:justify-start min-[450px]:gap-6 2xl:gap-10">
          <TabItem
            tabItemLayoutId="nestedTabIndicator"
            className={tabItemClassName}
          >
            Ongoing Claims
          </TabItem>
          <TabItem
            tabItemLayoutId="nestedTabIndicator"
            className={tabItemClassName}
          >
            Completed Claims
          </TabItem>
          {/* <span className="absolute inset-x-0 bottom-0 border border-gray-200"></span> */}
        </Tab.List>
        <TabPanels className="mt-4">
          <TabPanel className="focus:outline-none">
            {!loading &&
              claimsDataOngoing.length > 0 &&
              claimsDataOngoing.map((item, idx) => {
                return (
                  <VoteDetailsCard
                    key={idx}
                    claimData={item}
                    getClaimData={getClaimData}
                  />
                );
              })}
          </TabPanel>
          <TabPanel className="focus:outline-none">
            {!loading &&
              claimsDataOld.length > 0 &&
              claimsDataOld.map((item, idx) => {
                return (
                  <VoteDetailsCard
                    key={idx}
                    claimData={item}
                    getClaimData={getClaimData}
                  />
                );
              })}
          </TabPanel>
        </TabPanels>
      </Tab.Group>
    </div>
  );
};

export default ClaimPage;
