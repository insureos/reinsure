import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';

import ClaimPage from '@/components/claim-payouts/claim-page';

const ClaimsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Claim Payouts" description="InsureOS" />
      <ClaimPage />
    </>
  );
};

ClaimsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ClaimsPage;
