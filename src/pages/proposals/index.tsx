import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';

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
  const tabMenuItems = [
    {
      title: (
        <>
          Risk Mitigation
          {totalActiveVote > 0 && (
            <span className="ml-0.5 md:ml-1.5 lg:ml-2">{totalActiveVote}</span>
          )}
        </>
      ),
      path: 'active',
    },
    {
      title: (
        <>
          Claim Processing
          {totalOffChainVote > 0 && (
            <span className="ml-0.5 md:ml-1.5 lg:ml-2">
              {totalOffChainVote}
            </span>
          )}
        </>
      ),
      path: 'off-chain',
    },
    {
      title: (
        <>
          Expired{' '}
          {totalExecutableVote > 0 && (
            <span className="ml-0.5 md:ml-1.5 lg:ml-2">
              {totalExecutableVote}
            </span>
          )}
        </>
      ),
      path: 'executable',
    },
  ];
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
              <h2 className="mb-2 font-medium uppercase text-gray-100 xl:text-lg">
                You have 100 votes
              </h2>
              <p className="leading-relaxed text-gray-400">
                You need REASSURE tokens to participate in governance.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToCreateProposalPage()}
            >
              Create Proposal
            </Button>
          </div>
        </header>
        <ParamTab tabMenu={tabMenuItems}>
          <TabPanel className="focus:outline-none">
            <VoteList voteStatus={'active'} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <VoteList voteStatus={'off-chain'} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <VoteList voteStatus={'executable'} />
          </TabPanel>
        </ParamTab>
      </section>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
