import Image from '@/components/ui/image';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import newLogo from '@/assets/images/logo-transparent.png';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative overflow-hidden">
        {isMounted && <Image src={newLogo} alt="ReAssure" height={40} />}
      </span>
    </div>
  );
};

export default Logo;
