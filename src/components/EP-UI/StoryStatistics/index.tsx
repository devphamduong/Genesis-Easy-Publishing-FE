import { FC } from "react";
import "./EPStoryStatistics.scss";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  IChapterInteraction,
  IStoryInteraction,
} from "../../../interfaces/story.interface";

interface IProps {
  width?: string | number;
  height?: string | number;
  storyInteraction?: IStoryInteraction;
  chaptersInteraction?: IChapterInteraction;
}

const EPStoryStatistics: FC<IProps> = (props: IProps) => {
  const { storyInteraction, chaptersInteraction, width, height } = props;

  return (
    <>
      {storyInteraction && (
        <ResponsiveContainer width={width ?? "100%"} height={height ?? "100%"}>
          <BarChart
            width={500}
            height={300}
            data={Object.keys(storyInteraction).map((key) => {
              return {
                name: key,
                interaction: storyInteraction[key],
              };
            })}
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
            <Bar
              dataKey="interaction"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
      {chaptersInteraction && chaptersInteraction?.interaction?.length > 0 && (
        <ResponsiveContainer width={width ?? "100%"} height={height ?? "100%"}>
          <LineChart
            width={500}
            height={300}
            data={chaptersInteraction?.interaction?.map((item, index) => {
              return {
                name: "Chapter " + item.chapterNumber,
                purchased: item.purchaseChapter,
                reported: item.reportChapter,
              };
            })}
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
              dataKey="purchased"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="reported" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default EPStoryStatistics;
