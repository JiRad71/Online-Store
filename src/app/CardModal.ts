import data from "../asset/resource/data.json"

interface IData {
    num: string,
    name: string,
    quantity: string,
    cooler:string,
    shape: string,
    strength: string,
    size: string,
    favorite: boolean
}



type IDates = Record<string, IData>

export class DataModel{
    dataUrl!: Array<IData>;
    constructor(){

    }

    public async buildData(){
        this.dataUrl = await this.loadData(data);
        return this;
    }

    private loadData(url: string): Promise<Array<IData>>{
       return fetch(url).then(res=>res.json()).then((dataUrl: IDates)=>{
            const modelData: Array<IData> = Object.keys(dataUrl).map(index=>{
                return dataUrl[index];
            })
        return modelData;
        });
    }
}

