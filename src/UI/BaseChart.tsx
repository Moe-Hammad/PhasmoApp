import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type BaseChartProps = {
  data: { value: number | undefined }[];
  color: string;
};

export function BaseChart(props: BaseChartProps) {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart data={props.data}>
        <CartesianGrid
          // grid pattern
          stroke="#000000ff"
          strokeDasharray="5 5"
          fill="#1C1C1C"
        />
        <Area
          // Dataarea
          fillOpacity={0.3}
          fill={props.color}
          stroke={"#5DD4EE"}
          strokeWidth={3}
          type="monotone"
          dataKey="value"
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
