import { motion } from 'framer-motion';

interface VotePollTypes {
  accepted?: {
    vote: number;
    percentage: number;
  };
  rejected?: {
    vote: number;
    percentage: number;
  };
}

export default function VotePoll({ accepted, rejected }: VotePollTypes) {
  return (
    <motion.div layout className="mb-6 px-6">
      <div className="flex w-full mb-3 items-center justify-between text-sm xl:text-base 3xl:text-lg">
        <div>Time Remaining</div>
        <div>2hrs 33mins</div>
      </div>
      <div className="mb-3">
        <svg width="100%" height="8">
          <rect x="0" y="0" width="100%" height="8" fill="#FA606A" />
          <rect
            x="0"
            y="0"
            height="8"
            fill="#28D294"
            width={`${accepted?.percentage}%`}
          />
        </svg>
      </div>
    </motion.div>
  );
}
