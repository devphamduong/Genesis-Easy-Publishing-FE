import { IStory } from "./home/home.interface";

export interface ICategory {
  categoryId: string;
  categoryName: string;
  icon?: string;
  stories: IStory[];
}
