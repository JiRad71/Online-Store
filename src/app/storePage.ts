import Control from "../common/control";

export class StorePage extends Control{
    constructor (parrentNode: HTMLElement){
        super (parrentNode);
        this.header();
    }
    private header(){
        const header = new Control(this.node, 'div', 'header', '');
        new Control(header.node, 'div', 'logo', 'Online Store')
        const cart = new Control (header.node, 'img', 'imgLogo', '')
        cart.node.setAttribute("src", "../public/img/cart.jpg");
    }
    private filters(){
        const filterBlocks = new Control(this.node, 'div', 'filter_block', '')

    }
}