import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

export type ChartProps = {
  data: number[];
  maxDataPoint: number;
  color: string;
};
export function Chart(props: ChartProps) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));

    return [
      ...points,
      ...Array.from({ length: props.maxDataPoint - points.length }).map(() => ({
        value: undefined,
      })),
    ];
  }, [props.data, props.maxDataPoint]);

  return <BaseChart data={preparedData} color={props.color}></BaseChart>;
}
