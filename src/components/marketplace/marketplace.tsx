// import trading chartData
import { candlesDataTwo, volumeData } from '@/data/static/trading-data';
import CoinBar from '@/components/marketplace/coin-bar';
import CoinList from '@/components/marketplace/coin-list';
import InvestForm from '@/components/marketplace/invest-form';
import TradingChart from '@/components/marketplace/trading-chart';

export default function MarketPlace() {
  return (
    <>
      <CoinBar />
      <div className="@container mt-4 grid grid-cols-12 gap-6">
        <div className="order-2 col-span-8 block">
          <TradingChart data={candlesDataTwo} volumeData={volumeData} />
        </div>
        <div className="order-2 col-span-4">
          <InvestForm />
        </div>
        <div className="order-3 col-span-full">
          <CoinList />
        </div>
      </div>
    </>
  );
}
