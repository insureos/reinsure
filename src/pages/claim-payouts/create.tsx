import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';

import CreateClaim from '@/components/claim-payouts/create-claim';

const CreateProposalPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Create Claim Proposal" description="InsureOS" />
      <CreateClaim />
    </>
  );
};

CreateProposalPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateProposalPage;
