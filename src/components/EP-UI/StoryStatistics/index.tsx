import { FC, useEffect, useState } from "react";
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
import { Slider } from "antd";
import { getChartChapters } from "../../../services/author-api-service";

interface IProps {
  width?: string | number;
  height?: string | number;
  storyId?: string | number;
  storyInteraction?: IStoryInteraction;
  chaptersInteraction?: IChapterInteraction;
}

const EPStoryStatistics: FC<IProps> = (props: IProps) => {
  const { storyInteraction, chaptersInteraction, storyId, width, height } =
    props;
  const [chapter, setChapter] = useState<IChapterInteraction>();
  const [chapterRange, setChapterRange] = useState<number[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setChapter(chaptersInteraction);
    setChapterRange([
      chaptersInteraction?.min ?? 0,
      chaptersInteraction?.max ?? 0,
    ]);
    console.log([chaptersInteraction?.min ?? 0, chaptersInteraction?.max ?? 0]);
  }, [chaptersInteraction]);

  useEffect(() => {
    fetchChartChapters();
  }, [query]);

  const onChangeChapterRange = (value: number[]) => {
    console.log(value);
    setQuery(`&from=${value[0]}&to=${value[1]}`);
  };

  const fetchChartChapters = async () => {
    let url = `storyId=${storyId!}`;
    if (query) {
      url += query;
    }
    const res = await getChartChapters(url);
    if (res && res.ec === 0) {
      setChapter(res.dt);
    }
  };

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
      {chapter && chapter?.interaction?.length > 0 && (
        <>
          <ResponsiveContainer
            width={width ?? "100%"}
            height={height ?? "100%"}
          >
            <LineChart
              width={500}
              height={300}
              data={chapter?.interaction?.map((item, index) => {
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
          {chapterRange[0] > 0 && chapterRange[1] > 0 && (
            <>
              <div>
                Từ chương: {chapterRange[0]} đến chương: {chapterRange[1]}
              </div>
              <Slider
                range
                defaultValue={chapterRange}
                min={chapterRange[0]}
                max={chapterRange[1]}
                // onChange={onChange}
                onChangeComplete={onChangeChapterRange}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default EPStoryStatistics;
