import cn from 'classnames';
import ListCard from '@/components/ui/list-card';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import SidebarTwo from '@/layouts/sidebar/_portfolio';

import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';

const tabMenu = [
  {
    title: 'Collection',
    path: 'collection',
  },
  {
    title: 'Portfolio',
    path: 'portfolio',
  },
  {
    title: 'History',
    path: 'history',
  },
];

export default function Portfolio() {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-8 md:space-y-10 xl:space-y-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
          {authorWallets?.map((wallet) => (
            <ListCard
              item={wallet}
              key={`wallet-key-${wallet?.id}`}
              variant="medium"
            />
          ))}
        </div>
        <div className="block">
          <h3 className="mb-3 text-sm font-medium uppercase text-white xl:text-base 3xl:text-lg">
            Insuree
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {authorProtocols?.map((protocol) => (
              <ListCard
                item={protocol}
                key={`protocol-key-${protocol?.id}`}
                variant="large"
              />
            ))}
          </div>
        </div>
        <div className="block">
          <h3 className="mb-3 text-sm font-medium uppercase text-white xl:text-base 3xl:text-lg">
            Insurer
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorNetworks?.map((network) => (
              <ListCard
                item={network}
                key={`network-key-${network?.id}`}
                variant="medium"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-sm font-medium uppercase text-white xl:text-base 3xl:text-lg">
          Transactions
        </h3>
        <TransactionSearchForm />
        <TransactionHistory />
      </div>
    </div>
  );
}
