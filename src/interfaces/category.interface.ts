import { IStory } from "./story.interface";

export interface ICategory {
  categoryId: string;
  categoryName: string;
  icon?: string;
  stories?: [];
  storiesNumber?: number;
}
