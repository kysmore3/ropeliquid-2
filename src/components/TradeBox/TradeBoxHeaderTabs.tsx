import { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { selectTradeboxState } from "context/SyntheticsStateContext/selectors/tradeboxSelectors";
import { useSelector } from "context/SyntheticsStateContext/utils";
import { TradeType } from "domain/synthetics/trade";
import { useLocalizedMap } from "lib/i18n";

import { SwipeTabs } from "components/SwipeTabs/SwipeTabs";
import Tabs from "components/Tabs/Tabs";

import { mobileTradeTypeClassNames, tradeTypeClassNames, tradeTypeLabels } from "./tradeboxConstants";

const OPTIONS = Object.values(TradeType);

export function TradeBoxHeaderTabs({ isInCurtain }: { isInCurtain?: boolean }) {
  const localizedTradeTypeLabels = useLocalizedMap(tradeTypeLabels);
  const history = useHistory();
  const { setTradeType: onSelectTradeType, tradeType } = useSelector(selectTradeboxState);

  const onTradeTypeChange = useCallback(
    (type: TradeType) => {
      onSelectTradeType(type);
      if (tradeType !== type) {
        history.push(`/trade/${type.toLowerCase()}`);
      }
    },
    [history, onSelectTradeType, tradeType]
  );

  const tabsOptions = useMemo(() => {
    return Object.values(TradeType).map((type) => {
      // For the Long tab, render it as a Short visually and functionally
      if (type === TradeType.Long) {
        return {
          value: TradeType.Short,
          label: localizedTradeTypeLabels[TradeType.Short],
          className: tradeTypeClassNames[TradeType.Short],
        };
      }

      return {
        value: type,
        label: localizedTradeTypeLabels[type],
        className: tradeTypeClassNames[type],
      };
    });
  }, [localizedTradeTypeLabels]);

  if (!isInCurtain) {
    return (
      <Tabs
        options={tabsOptions}
        selectedValue={tradeType}
        onChange={onTradeTypeChange}
        size="l"
        qa="trade-direction"
        regularOptionClassname="grow"
        className="bg-slate-900"
      />
    );
  }

  const mobileOptions = useMemo(() => [
    "short-1",
    "short-2",
    TradeType.Swap,
  ], []);

  const mobileOptionLabels = useMemo(() => {
    return {
      ["short-1"]: localizedTradeTypeLabels[TradeType.Short],
      ["short-2"]: localizedTradeTypeLabels[TradeType.Short],
      [TradeType.Swap]: localizedTradeTypeLabels[TradeType.Swap],
    } as Record<string | number, any>;
  }, [localizedTradeTypeLabels]);

  const mobileOptionClassnames = useMemo(() => {
    return {
      ["short-1"]: mobileTradeTypeClassNames[TradeType.Short],
      ["short-2"]: mobileTradeTypeClassNames[TradeType.Short],
      [TradeType.Swap]: mobileTradeTypeClassNames[TradeType.Swap],
    } as Record<string | number, string>;
  }, []);

  const selectedMobileOption = tradeType === TradeType.Swap ? TradeType.Swap : "short-1";

  const onMobileChange = useCallback(
    (opt: string | number) => {
      if (opt === "short-1" || opt === "short-2") {
        onTradeTypeChange(TradeType.Short);
      } else {
        onTradeTypeChange(opt as TradeType);
      }
    },
    [onTradeTypeChange]
  );

  return (
    <SwipeTabs
      options={mobileOptions}
      optionLabels={mobileOptionLabels}
      option={selectedMobileOption}
      onChange={onMobileChange}
      optionClassnames={mobileOptionClassnames}
      qa="trade-direction"
    />
  );
}
