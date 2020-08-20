import {HopInterface} from "./Hop";
import {Option} from "./Option";
import {FermentableInterface} from "./Fermentable";

export interface RecipeInterface {
  name: string;
  boilSize: string;
  author: string;
  batchSize: string;
  style: string;
  boilTime: string;
  method: string;
  efficiency: string;
  fermentables: [FermentableInterface];
  yeast: [Option];
  hops: [HopInterface];
  other: [];
  notes: string;
}
