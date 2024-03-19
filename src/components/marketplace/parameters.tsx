// static data
import { parametersData } from '@/data/static/trading-data';

import Text from '@/components/ui/text';

export default function Parameters() {
  return (
    <div className="space-y-4">
      {parametersData.map((item:any) => (
        <div className="grid grid-cols-2" key={item.id}>
          <Text className="text-sm text-white">
            {item.title}
          </Text>
          <Text
            tag="span"
            className="text-end text-sm font-medium text-[#10B981] underline"
          >
            {item.text}
          </Text>
        </div>
      ))}
    </div>
  );
}
