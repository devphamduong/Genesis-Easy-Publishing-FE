import { IStory } from "./home/home.interface";

export interface ICategory {
  categoryId: number;
  categoryName: string;
  icon?: string;
  stories: IStory[];
}
