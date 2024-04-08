import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import OpenPolicies from '@/components/open-policies/open-policies';

const OpenPoliciesPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Open Policies" description="InsureOS" />
      <OpenPolicies />
    </>
  );
};

OpenPoliciesPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default OpenPoliciesPage;
