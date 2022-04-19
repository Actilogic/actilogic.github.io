import { FuelWatchItem } from "./fuelwatchitem.model";

class FuelWatchFeed {
  ;
  public title: string = "";
  public ttl: string = ""; // I think this is the time to live
  public link: string = "";
  public description: string = "";
  public language: string = "";
  public copyright: string = "";
  public lastBuildDate: string = "";
  public image: { url: string | null; title: string | null; link: string | null; } | null = null;
  public item: FuelWatchItem[] | null = null;
  public rss: any = null;

  constructor(json: any
  ) {

    this.title = json.title;
    this.ttl = json.ttl
    this.link = json.link
    this.description = json.description
    this.language = json.language
    this.copyright = json.copyright
    this.lastBuildDate = json.lastBuildDate
    this.image = json.image
    this.item = json.item
    this.rss = json.rss
  }


  public toString(): string {
    var text: string = this.copyright;
    // title: ${this.title}\n
    // ttl: ${this.ttl}\n
    // link: ${this.link}\n
    // description: ${this.description}\n
    // language: ${this.language}\n
    // copyright: ${this.copyright}\n
    // lastBuildDate: ${this.lastBuildDate}\n
    // image: ${this.image}\n
    // item: ${this.item.toString()}\n\n
    // console.log(text);
    return text;
  }

}


//now that we have the model class we can create arrays that contain fuelwatch class elements
export {
  FuelWatchFeed
}
