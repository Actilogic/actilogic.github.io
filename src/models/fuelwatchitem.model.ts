
class FuelWatchItem {

    public title: string = "";
    public description: string = "";
    public brand: string = "";
    public date: string = "";
    public price: string = "";
    public trading: string = "";
    public location: string = "";
    public address: string = "";
    public phone: string = "";
    public latitude: string = "";
    public longitude: string = "";
    public siteFeatures: string = "";

    constructor(
    ) { }

    public toString() {
        var text = `
            title: ${this.title},"\n",
            description: ${this.description},"\n",
            brand: ${this.brand},"\n",
            date: ${this.date},"\n",
            price: ${this.price},"\n",
            trading: ${this.trading},"\n",
            location: ${this.location},"\n",
            address: ${this.address},"\n",
            phone: ${this.phone},"\n",
            latitude: ${this.latitude},"\n",
            longitude: ${this.longitude},"\n",
            siteFeatures: ${this.siteFeatures},"\n","\n"
        `;
        console.log(text);
        return text;
    }

}

//now that we have the model class we can create arrays that contain fuelwatch class elements
export {
    FuelWatchItem

}