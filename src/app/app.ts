import Control from "../common/control";
import {StorePage} from "./storePage";
import "../styles/style.css"
import 'nouislider/dist/nouislider.css';

export class Application extends Control{
    constructor (parrentNode: HTMLElement){
        super (parrentNode);
        const storePage = new StorePage(this.node);
    }
}