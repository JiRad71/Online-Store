import {StorePage} from './storePage'
import {DataModel} from './CardModal'
import Control from '../common/control'

export class Filters extends StorePage {
    model!:DataModel;
    buttonTypeOne!:Control<HTMLElement>;
    constructor(parrentNode: HTMLElement, model: DataModel){
        super(parrentNode, model);
        // this.buttonTypeOne = buttonTypeOne;
        // this.filterByName(model);
        // console.log(this.model.dataUrl)

    }
}