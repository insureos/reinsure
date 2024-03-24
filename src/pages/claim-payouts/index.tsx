import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';

const tabItemClassName =
  'flex-1 justify-center capitalize text-gray-600 [&>span:first-child]:relative [&>span:first-child]:z-10 [&>span:first-child]:justify-center [&>span:first-child]:px-5 [&>span:first-child]:text-white [&>span:nth-of-type(2)]:top-1.5 [&>span:nth-of-type(2)]:z-0 [&>span:nth-of-type(2)]:h-[calc(100%-12px)] [&>span:nth-of-type(2)]:shadow-md [&>span:nth-of-type(2)]:bg-light-dark [&>span:only-child]:text-gray-300 [&>span]:overflow-hidden [&>span]:rounded-full';

const ProposalsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');
  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 800);
  }
  return (
    <>
      <NextSeo title="Proposal" description="reAssure.fi" />
      <section className="mx-auto w-full max-w-[1160px] text-sm ">
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
              onClick={() => goToCreateProposalPage()}
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
              Completed Claims
            </TabItem>
            <TabItem
              tabItemLayoutId="nestedTabIndicator"
              className={tabItemClassName}
            >
              Ongoing Claims
            </TabItem>
            {/* <span className="absolute inset-x-0 bottom-0 border border-gray-200"></span> */}
          </Tab.List>
          <TabPanels className="mt-4">
            <TabPanel className="focus:outline-none">
              <VoteList voteStatus={'active'} />
            </TabPanel>
            <TabPanel className="focus:outline-none">
              <VoteList voteStatus={'active'} />
            </TabPanel>
          </TabPanels>
        </Tab.Group>
      </section>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
