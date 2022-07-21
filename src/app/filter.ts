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
    filterByName(model: DataModel){
        this.buttonTypeOne.node.onclick=()=>{
            this.model.dataUrl.forEach(data=>{
            if(data.shape = 'Brusko'){
            const cards = new Control (this.cardsCont.node, 'div','cards','')
            const cardImage = new Control(cards.node, 'img','cardsImage','')
            new Control(cards.node, 'div','cardsTitle',`${data.name}`)
            cardImage.node.setAttribute('src', `../public/img/${data.num}.jpg`)
            new Control(cards.node, 'div','cardsQuantity',`Количество на складе: ${data.quantity}`)
            new Control(cards.node, 'div','cardsStrength',`Крепость: ${data.strength}`)
            new Control(cards.node, 'div','cardsShape',`Изготовитель: ${data.shape}`)
            new Control(cards.node, 'div','cardsShape',`Куллер: ${data.cooler}`)
            let cardFavorite:string;
            if (data.favorite === false) {cardFavorite="Нет"}
            else {cardFavorite="Да"}
            new Control(cards.node, 'div','cardsFavorite',`Популярность: ${cardFavorite}`)
            new Control(cards.node, 'div','cardsSize',`Размер: ${data.size}`)
            }
        })}
    }
}