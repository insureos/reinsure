import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/loader';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import InvestmentTable from '@/components/marketplace/investment-tab/investment-table';

// Dynamic imports
const DailyProfits = dynamic(
  () =>
    import(
      '@/components/marketplace/investment-tab/profit-table-charts/daily-profits'
    )
);
const WinRate = dynamic(
  () =>
    import(
      '@/components/marketplace/investment-tab/profit-table-charts/win-rate'
    )
);
const ProfitDistribution = dynamic(
  () =>
    import(
      '@/components/marketplace/investment-tab/profit-table-charts/profit-distribution'
    )
);
const AssetsAllocation = dynamic(
  () =>
    import(
      '@/components/marketplace/investment-tab/profit-table-charts/assets-allocation'
    )
);
const TotalProfit = dynamic(
  () =>
    import(
      '@/components/marketplace/investment-tab/profit-table-charts/total-profit'
    )
);

const tabMenuItems = [
  {
    title: <>Running Bots</>,
    path: 'running-bots',
  },
  {
    title: <>Strategy History</>,
    path: 'strategy-history',
  },
  {
    title: <>Total Profit</>,
    path: 'total-profit',
  },
];

export default function InvestmentTab() {
  return (
    <div className="mt-6 rounded-lg bg-white p-4 pb-0 shadow-card dark:bg-light-dark sm:px-6 sm:pt-6 2xl:px-8">
      <Suspense fallback={<Loader variant="blink" />}>
        <ParamTab
          tabMenu={tabMenuItems}
          tabListClassName="!bg-transparent !mb-4"
        >
          <TabPanel className="focus:outline-none">
            <InvestmentTable />
          </TabPanel>
          <TabPanel className="pb-5 focus:outline-none">
            <InvestmentTable />
          </TabPanel>
          <TabPanel className="@container pb-5 focus:outline-none">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
              <DailyProfits />
              <TotalProfit />
              <ProfitDistribution />
              <AssetsAllocation />
              <WinRate />
            </div>
          </TabPanel>
        </ParamTab>
      </Suspense>
    </div>
  );
}
