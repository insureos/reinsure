import { StaticImageData } from 'next/image';
import Image from '@/components/ui/image';
import FeaturedCard from '@/components/nft/featured-card';
import ListCard from '@/components/ui/list-card';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import { nftData } from '@/data/static/single-nft';
import NftDropDown from '@/components/nft/nft-dropdown';
import Avatar from '@/components/ui/avatar';
import NftFooter from './nft-footer';
import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';
import { useScrollableSlider } from '@/lib/hooks/use-scrollable-slider';
import { ChevronDown } from '../icons/chevron-down';

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};
type NftDetailsProps = {
  isAuction?: boolean;
  image: StaticImageData;
  name: string;
  description: string;
  minted_date: string;
  minted_slug: string;
  price: number;
  creator: Avatar;
  collection: Avatar;
  owner: Avatar;
  block_chains: Avatar[];
};

export default function NftDetails({ product }: { product: NftDetailsProps }) {
  const {
    isAuction,
    image,
    name,
    description,
    minted_date,
    minted_slug,
    price,
    creator,
    collection,
    owner,
    block_chains,
  } = product;

  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div className="flex h-full w-full transition-all">
      <Tab.Group key={'list-tabs'}>
        <div className="flex h-[70vh] w-[40%] flex-col justify-between rounded-xl bg-light-dark">
          <div className="h-[85%]">
            <TabPanels className="m-4 h-full">
              <TabPanel className="focus:outline-none">
                <div>Tab1</div>
              </TabPanel>
              <TabPanel className="focus:outline-none">
                <div>Tab2</div>
              </TabPanel>
              <TabPanel className="focus:outline-none">
                <div>Tab3</div>
              </TabPanel>
            </TabPanels>
          </div>
          <div className="mx-3 mb-3 flex items-start rounded-xl bg-dark px-3">
            <button
              ref={sliderPrevBtn}
              onClick={() => scrollToTheLeft()}
              className="flex h-8 w-6 items-center justify-center bg-gradient-to-r from-gray-800 to-transparent text-dark xs:hidden"
            >
              <ChevronDown className="w-4 rotate-90 text-white" />
            </button>
            <div className="-mb-4 flex h-full min-h-[36px] w-full items-start overflow-hidden xs:mb-0">
              <Tab.List
                ref={sliderEl}
                className="coin-list-scrollbar relative flex w-full justify-evenly overflow-x-auto scroll-smooth text-sm"
              >
                <TabItem className="whitespace-nowrap capitalize text-gray-600 2xl:uppercase [&>span]:px-0">
                  Tab1
                </TabItem>
                <TabItem className="whitespace-nowrap px-0 capitalize text-gray-600 2xl:uppercase">
                  Tab2
                </TabItem>
                <TabItem className="whitespace-nowrap px-0 capitalize text-gray-600 2xl:uppercase">
                  Tab3
                </TabItem>
              </Tab.List>
            </div>
            <button
              ref={sliderNextBtn}
              onClick={() => scrollToTheRight()}
              className="flex h-8 w-6 items-center justify-center bg-gradient-to-l from-gray-800 to-transparent text-dark xs:hidden"
            >
              <ChevronDown className="w-4 -rotate-90 text-white" />
            </button>
          </div>
        </div>
      </Tab.Group>
      <div className="relative flex w-[60%] flex-col justify-between md:ml-auto md:pl-8 lg:pl-12 xl:pl-20">
        <div className="block">
          <div className="block">
            <div className="flex justify-between">
              <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-white md:text-2xl xl:text-3xl">
                {/* {name} */}
                oracle heading
              </h2>
              <div className="ml-3 mt-1.5 shrink-0 xl:mt-2">
                <NftDropDown />
              </div>
            </div>
            <AnchorLink
              href={minted_slug}
              className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-400 hover:text-white xl:mt-2.5"
            >
              created on {minted_date}
              <ArrowLinkIcon className="ml-2 h-3 w-3" />
            </AnchorLink>
            <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
              <div className="shrink-0 border-dashed border-gray-700 lg:border-r lg:px-6">
                <h3 className="text-heading-style mb-2 uppercase text-white">
                  Created By
                </h3>
                <AnchorLink href={creator?.slug} className="inline-flex">
                  <ListCard
                    item={creator}
                    className="rounded-full p-2 text-gray-400 hover:text-white"
                  />
                </AnchorLink>
              </div>
              <div className="shrink-0 lg:px-6">
                <h3 className="text-heading-style mb-2.5 uppercase text-white">
                  Theme
                </h3>
                <AnchorLink href="#" className="inline-flex">
                  <ListCard
                    item={collection}
                    className="rounded-full p-2 text-gray-400 hover:text-white"
                  />
                </AnchorLink>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col pb-5 xl:mt-9">
            <div className="space-y-6">
              <div className="block">
                <h3 className="text-heading-style mb-2 uppercase text-white">
                  Logic
                </h3>
                <div className="text-sm leading-6 -tracking-wider text-gray-400">
                  {description}
                </div>
              </div>
              <div className="block">
                <h3 className="text-heading-style mb-2 uppercase text-white">
                  Raw Data Sources
                </h3>
                <AnchorLink href={owner?.slug} className="inline-block">
                  <ListCard
                    item={owner}
                    className="rounded-full p-2 text-gray-400 hover:text-white"
                  />
                </AnchorLink>
              </div>
              <div className="block">
                <h3 className="text-heading-style mb-2 uppercase text-white">
                  Affected Insurer Pools
                </h3>
                <div className="flex flex-col gap-2">
                  {block_chains?.map((item: any) => (
                    <AnchorLink href="#" className="inline-flex" key={item?.id}>
                      <ListCard
                        item={item}
                        className="rounded-full p-2 text-gray-400 hover:text-white"
                      />
                    </AnchorLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
