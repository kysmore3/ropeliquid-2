import { useBreakpoints } from "lib/useBreakpoints";

import { Curtain } from "./Curtain";
import { TradeBox } from "./TradeBox";
import { TradeBoxHeaderTabs } from "./TradeBoxHeaderTabs";

export function TradeBoxResponsiveContainer() {
  const { isTablet } = useBreakpoints();

  if (!isTablet) {
    return (
      <div className="text-body-medium flex flex-col rounded-8" data-qa="tradebox">
        <TradeBoxHeaderTabs />
        <TradeBox isMobile={isTablet} />
      </div>
    );
  }

    return (
    <Curtain
      header={<TradeBoxHeaderTabs isInCurtain />}
      dataQa="tradebox"
      className="bg-white/6 backdrop-blur-[12px] saturate-[1.8] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_8px_32px_rgba(0,0,0,0.3)]"
    >
      <TradeBox isMobile={isTablet} />
    </Curtain>
  );
}
