import { FC } from "react";
import "./EPStoryStatistics.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IProps {}

const EPStoryStatistics: FC<IProps> = (props: IProps) => {
  const data = [
    {
      name: "Page A",
      Follow: 4000,
      Like: 2400,
    },
    {
      name: "Page B",
      Follow: 3000,
      Like: 1398,
    },
    {
      name: "Page C",
      Follow: 2000,
      Like: 9800,
    },
    {
      name: "Page D",
      Follow: 2780,
      Like: 3908,
    },
    {
      name: "Page E",
      Follow: 1890,
      Like: 4800,
    },
    {
      name: "Page F",
      Follow: 2390,
      Like: 3800,
    },
    {
      name: "Page G",
      Follow: 3490,
      Like: 4300,
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Like"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Follow" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default EPStoryStatistics;
