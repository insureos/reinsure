import cn from 'classnames';
import { NFTList } from '@/data/static/nft-list';
import NFTGrid from '@/components/ui/nft-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();
  return (
    <div
      className={cn(
        'grid gap-5 sm:grid-cols-2',
        isGridCompact
          ? '3xl:!grid-cols-3 4xl:!grid-cols-4'
          : '3xl:!grid-cols-2 4xl:!grid-cols-3',
        className
      )}
    >
      {NFTList.map((nft) => (
        <NFTGrid
          key={nft.id}
          name={nft.name}
          image={nft.image}
          author={nft.author}
          authorImage={nft.authorImage}
          price={nft.price}
          collection={nft.collection}
        />
      ))}
    </div>
  );
}
