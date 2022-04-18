import { FuelWatchItem } from "./fuelwatchitem.model";

class FuelWatchFeed {
  public title: string = "";
  public ttl: string = ""; // I think this is the time to live
  public link: string = "";
  public description: string = "";
  public language: string = "";
  public copyright: string = "";
  public lastBuildDate: string = "";
  public image: { url: string | null; title: string | null; link: string | null; } | null = null;
  public items: FuelWatchItem[] | null = null;

  constructor(
  ) { }


}

//now that we have the model class we can create arrays that contain fuelwatch class elements
export {
  FuelWatchFeed
}
