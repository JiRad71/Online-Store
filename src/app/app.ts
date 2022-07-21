import Control from "../common/control";
import {StorePage} from "./storePage";
import "../styles/style.css"
import 'nouislider/dist/nouislider.css';
import {DataModel} from './CardModal'

export class Application extends Control{
    constructor (parrentNode: HTMLElement){
        super (parrentNode);
        const model = new DataModel()
        const storePage = new StorePage(this.node, model);
    }
}