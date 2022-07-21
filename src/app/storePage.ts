import Control from "../common/control";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {DataModel} from './CardModal';
import {IData} from './CardModal'
import { throws } from "assert";

interface Filters {
    name: string[], 
    strenght: number[],
    cooler: string[],
    favorite: boolean[]
}

export class StorePage extends Control  {
    valueRangeQuantity: number[];
    filterCont!: Control<HTMLElement>;
    valueRangeSize: number[];
    buttonTypeOne!: Control<HTMLElement>;
    model: DataModel;
    onClick?: () => void;
    cardsCont!: Control<HTMLElement>
    counter!: Control<HTMLElement>;
    filterAll: Filters;
    buttonTypeTwo!: Control<HTMLElement>;
    buttonTypeThree!: Control<HTMLElement>;
    buttonTypeFour!: Control<HTMLElement>;
    buttonType5!: Control<HTMLElement>;
    buttonType6!: Control<HTMLElement>;
    buttonType7!: Control<HTMLElement>;
    buttonColorOne!: Control<HTMLElement>;
    buttonColorTwo!: Control<HTMLElement>;
    buttonColorThree!: Control<HTMLElement>;
    buttonSizeOne!: Control<HTMLElement>;
    buttonSizeTwo!: Control<HTMLElement>;
    buttonPopular!: Control<HTMLElement>;
    filterInput!: Control<HTMLElement>;
    lupa!: Control<HTMLElement>;
    filterButtonReset!: Control<HTMLElement>;
    constructor (parrentNode: HTMLElement, model: DataModel){
        super (parrentNode, 'div', 'wrapper');
        this.model = model;
        const m = this.model.buildData().then(data=> data.dataUrl);
        this.valueRangeQuantity = [];
        this.valueRangeSize = [];
        const filterAll = {
            name: ['Brusko','Glitch Souse', 'Fresh Fruits', 'Maxwells', 'XL', 'BOOM BIG', 'ICE PARADISE'],
            strenght: [20, 40, 50],
            cooler: ['с куллером', 'без куллера'],
            favorite: [true, false]
        }
        this.filterAll = filterAll;
        const Wrapper = new Control (this.node, 'div', 'wrapper', '')
        this.header();
        this.filter();
        setTimeout(() => {
            this.card(this.model.dataUrl); 
        }, 100); 
        this.filterByName();
        // this.poisk();
        this.reset();
        setTimeout(() => {
            this.footer();  
        }, 101); 
        
    }
    
    private header(){
        const header = new Control(this.node, 'div', 'header', '');
        new Control(header.node, 'div', 'logo', 'Online Store');
        const cart = new Control (header.node, 'img', 'imgLogo', '');
        cart.node.setAttribute("src", "./public/img/cart.jpg");
    }
    public filter(){
        this.filterCont = new Control (this.node, 'div', 'filter-cont','');
        const filterBlocksOne = new Control(this.filterCont.node, 'div', `filter-block`, '');
        const filterTitleOne = new Control(filterBlocksOne.node, 'h4', 'filter-title', 'Фильтр по значению');
        const filterByShape = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Производитель: ');
        this.buttonTypeOne = new Control(filterByShape.node, 'button', 'button-type', 'Brusko');
        this.buttonTypeTwo = new Control(filterByShape.node, 'button', 'button-type', 'Glitch Souse');
        this.buttonTypeThree = new Control(filterByShape.node, 'button', 'button-type', 'Fruit Fresh');
        this.buttonTypeFour = new Control(filterByShape.node, 'button', 'button-type', 'Maxwells');
        this.buttonType5 = new Control(filterByShape.node, 'button', 'button-type', 'XL');
        this.buttonType6 = new Control(filterByShape.node, 'button', 'button-type', 'BOOM BIG');
        this.buttonType7 = new Control(filterByShape.node, 'button', 'button-type', 'ICE PARADISE');
        const filterByColor = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Крепость: ');
        this.buttonColorOne = new Control(filterByColor.node, 'button', 'button-color-one', '20');
        this.buttonColorTwo = new Control(filterByColor.node, 'button', 'button-color-two', '40');
        this.buttonColorThree = new Control(filterByColor.node, 'button', 'button-color-three', '50');
        const filterBySize = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Куллер: ');
        this.buttonSizeOne = new Control(filterBySize.node, 'button', 'button-size-one', 'Есть');
        this.buttonSizeTwo = new Control(filterBySize.node, 'button', 'button-size-two', 'Нет');
        this.buttonPopular = new Control (filterBlocksOne.node, 'button', 'button-popular', 'Популярные')
        const filterBlocksTwo = new Control(this.filterCont.node, 'div', `filter-block`, '');
        const filterTitleTwo = new Control(filterBlocksTwo.node, 'h4', 'filter-title', 'Фильтры по диапазону');
        const filterRangeTitleOne = new Control(filterBlocksTwo.node, 'h5', 'filter-range-title-one', 'Количество на складе:')
        const filterRange = new Control(filterBlocksTwo.node, 'div', 'filter-range', '')
        const filterRangeValue = new Control(filterBlocksTwo.node, 'div', 'filter-range-value-lower', '')
        filterRange.node.setAttribute('id', 'filterRange')
        const range: noUiSlider.target = document.getElementById('filterRange')!;
        noUiSlider.create(range , {
            start: [1, 18],
            connect: true,
            step: 1,
            range: {
                'min': 1,
                'max': 18
            }
        });

        filterRangeValue.node.setAttribute('id', 'filterRangeValue');
        const snapValues = document.getElementById('filterRangeValue')!;
        let valueRangeQuantity: number[] = [];
        range.noUiSlider?.on('update', function (values: (string | number)[]):void {
            snapValues.innerHTML = values.join(' - ');
            values.forEach((str)=>{valueRangeQuantity.push(Number(str.toString().replace('.00', '')))});
        });
        const filterRangeTitleTwo = new Control(filterBlocksTwo.node, 'h5', 'filter-range-title-one', 'Объем банки:')
        const filterRangeTwo = new Control(filterBlocksTwo.node, 'div', 'filter-range', '')
        const filterRangeValue2 = new Control(filterBlocksTwo.node, 'div', 'filter-range-value-upper', '')

        filterRangeTwo.node.setAttribute('id', 'filterRangeTwo')
        const rangeTwo: noUiSlider.target = document.getElementById('filterRangeTwo')!;
        noUiSlider.create(rangeTwo , {
            start: [30, 60],
            connect: true,
            step: 10,
            range: {
                'min': 30,
                'max': 60
            }
        });

        filterRangeValue2.node.setAttribute('id', 'filterRangeValue2');
        const snapValues2 = document.getElementById('filterRangeValue2')!;
        let valueRangeSize: number[] = [];
        rangeTwo.noUiSlider?.on('update', function (values: (string | number)[]):void {
            snapValues2.innerHTML = values.join(' - ');
            values.forEach((str)=>{valueRangeSize.push(Number(str.toString().replace('.00', '')))});
        });

        const filterBlocksThree = new Control(this.filterCont.node, 'div', `filter-block`, '');
        const filterByName = new Control(filterBlocksThree.node, 'div', `filter-name`, '');
        const filterTitleName = new Control(filterByName.node, 'h4', 'filter-title', 'Поиск');
        const wrapperPoisk = new Control(filterByName.node, 'div', 'wrapperPoisk', '')
        this.filterInput = new Control(wrapperPoisk.node, 'input', 'filter-input', '');
        this.lupa = new Control(wrapperPoisk.node, 'img', 'lupa', '')
        this.lupa.node.setAttribute('src', './public/img/lupa.jpg')
        this.filterInput.node.setAttribute('placeholder', 'Введите текст')
        this.filterInput.node.setAttribute('value', ' ')
        this.filterInput.node.setAttribute('type', 'search')
        this.filterInput.node.setAttribute('id', 'input')
        this.filterInput.node.focus();
        const filterTitleSorting = new Control(filterBlocksThree.node, 'h4', 'filter-title', 'Сортировка');
        const filterFormSorting = new Control(filterBlocksThree.node, 'form', 'filter-form', '');
        const filterAlphabetASorting = new Control(filterFormSorting.node, 'div', 'filter-sorting', '');
        const filterSortingInputOne = new Control(filterAlphabetASorting.node, 'input', 'filter-sorting-input', '');
        const filterSortingLabelOne = new Control(filterAlphabetASorting.node, 'label', 'filter-sorting-label', ' По алфавиту, от А до Я ');
        filterSortingLabelOne.node.setAttribute('for', 'alphabetA')
        filterSortingInputOne.node.setAttribute('id', 'alphabetA')
        filterSortingInputOne.node.setAttribute('name', 'sorting')
        filterSortingInputOne.node.setAttribute('type', 'radio')
        const filterAlphabetZSorting = new Control(filterFormSorting.node, 'div', 'filter-sorting', '');
        const filterSortingInputTwo = new Control(filterAlphabetZSorting.node, 'input', 'filter-sorting-input', '');
        const filterSortingLabelTwo = new Control(filterAlphabetZSorting.node, 'label', 'filter-sorting-label', ' По алфавиту, от Я до А ');
        filterSortingLabelTwo.node.setAttribute('for', 'alphabetZ')
        filterSortingInputTwo.node.setAttribute('id', 'alphabetZ')
        filterSortingInputTwo.node.setAttribute('name', 'sorting')
        filterSortingInputTwo.node.setAttribute('type', 'radio')
        const filterYaerOneSorting = new Control(filterFormSorting.node, 'div', 'filter-sorting', '');
        const filterSortingInputThree = new Control(filterYaerOneSorting.node, 'input', 'filter-sorting-input', '');
        const filterSortingLabelThree = new Control(filterYaerOneSorting.node, 'label', 'filter-sorting-label', ' По году выхода, по возрастанию ');
        filterSortingLabelThree.node.setAttribute('for', 'year1')
        filterSortingInputThree.node.setAttribute('id', 'year1')
        filterSortingInputThree.node.setAttribute('name', 'sorting')
        filterSortingInputThree.node.setAttribute('type', 'radio')
        const filterYearTwoSorting = new Control(filterFormSorting.node, 'div', 'filter-sorting', '');
        const filterSortingInputFour = new Control(filterYearTwoSorting.node, 'input', 'filter-sorting-input', '');
        const filterSortingLabelFour = new Control(filterYearTwoSorting.node, 'label', 'filter-sorting-label', ' По году выхода, по возрастанию');
        filterSortingLabelFour.node.setAttribute('for', 'year2')
        filterSortingInputFour.node.setAttribute('id', 'year2')
        filterSortingInputFour.node.setAttribute('name', 'sorting')
        filterSortingInputFour.node.setAttribute('type', 'radio')
        this.filterButtonReset = new Control (filterBlocksThree.node, 'button', 'filter-button-reset', 'Сбросить фильтры')
        const filterButtonSettings = new Control (filterBlocksThree.node, 'button', 'filter-button-settings', 'Сбросить настройки')
    }
    public card(modelData: IData[]){
        this.cardsCont = new Control (this.node, 'div','cards-cont','');
        let cont: number;
        let i:number;
        this.counter = new Control(this.node, 'div', 'counter', `${cont=0}`);
        modelData.forEach(data=>{
            const cards = new Control (this.cardsCont.node, 'div','cards','');
            cards.node.onclick = () => {
                if (!cards.node.classList.contains("cards-plus")){
                    cards.node.classList.add('cards-plus')
                    this.counter.node.textContent = `${cont++}`
                }
                else {
                    cards.node.classList.remove('cards-plus');
                    this.counter.node.textContent = `${cont--}`
                };}
            const cardImage = new Control(cards.node, 'img','cardsImage','');
            new Control(cards.node, 'div','cardsTitle',`${data.name}`);
            cardImage.node.setAttribute('src', `./public/img/${data.num}.jpg`);
            new Control(cards.node, 'div','cardsQuantity',`Количество на складе: ${data.quantity}`);
            new Control(cards.node, 'div','cardsStrength',`Крепость: ${data.strength}`);
            new Control(cards.node, 'div','cardsShape',`Изготовитель: ${data.shape}`);
            new Control(cards.node, 'div','cardsShape',`Куллер: ${data.cooler}`);
            let cardFavorite:string;
            if (data.favorite === false) {cardFavorite="Нет"}
            else {cardFavorite="Да"}
            new Control(cards.node, 'div','cardsFavorite',`Популярность: ${cardFavorite}`)
            new Control(cards.node, 'div','cardsSize',`Размер: ${data.size}`)
            })
    }

    private footer(){
        const footer = new Control(this.node,'div','footer','');
        const footerAnchorRS = new Control(footer.node, 'a', 'footer-anchor-rs', ' ');
        const footerAnchorRSS = new Control(footer.node, 'a','footer-anchor-rss','© Rolling Scopes School, 2022');
        footerAnchorRS.node.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.85 198.67"><title>rs_school</title><g fill="#000" data-name="Layer 2"><g fill="#000" data-name="Layer 1"><path d="M275.36 61.37l26.29-1.65q.86 6.41 3.48 9.76 4.28 5.43 12.2 5.43 5.91 0 9.12-2.77a8.34 8.34 0 0 0 3.2-6.44 8.18 8.18 0 0 0-3-6.22q-3-2.74-14.15-5.19-18.18-4.08-25.93-10.86a21.84 21.84 0 0 1-7.81-17.26 23.44 23.44 0 0 1 4-13 26.47 26.47 0 0 1 12-9.64q8-3.51 22-3.51 17.14 0 26.14 6.38t10.71 20.28l-26.05 1.52q-1-6-4.36-8.78t-9.2-2.77c-3.21 0-5.63.69-7.25 2.05a6.25 6.25 0 0 0-2.44 5 5 5 0 0 0 2 3.84q1.95 1.77 9.27 3.3 18.12 3.9 26 7.9t11.4 9.91a25.12 25.12 0 0 1 3.57 13.24 28.37 28.37 0 0 1-4.75 15.86 29.83 29.83 0 0 1-13.3 11q-8.55 3.75-21.54 3.75-22.81 0-31.6-8.78t-10-22.35zM6.27 91V1.53h46.06q12.81 0 19.58 2.19a20.93 20.93 0 0 1 10.92 8.14A24.75 24.75 0 0 1 87 26.35a24.8 24.8 0 0 1-3.2 12.84A24.91 24.91 0 0 1 75.07 48a33.63 33.63 0 0 1-9.7 3.54 27.79 27.79 0 0 1 7.19 3.29A27.79 27.79 0 0 1 77 59.49 35.16 35.16 0 0 1 80.85 65l13.38 26H63L48.24 63.63q-2.81-5.31-5-6.9a11.63 11.63 0 0 0-6.78-2.07H34V91zM34 37.76h11.68A41 41 0 0 0 53 36.54a7.3 7.3 0 0 0 4.48-2.81 8.24 8.24 0 0 0 1.74-5.18 8.23 8.23 0 0 0-2.75-6.65q-2.74-2.32-10.31-2.32H34zM0 167.56l26.29-1.64q.86 6.41 3.48 9.76Q34 181.11 42 181.11q5.91 0 9.12-2.78a8.34 8.34 0 0 0 3.2-6.44 8.2 8.2 0 0 0-3-6.22q-3-2.74-14.15-5.18-18.18-4.1-25.93-10.86a21.87 21.87 0 0 1-7.81-17.27 23.49 23.49 0 0 1 4-13 26.47 26.47 0 0 1 12-9.64q8-3.51 22-3.51 17.14 0 26.14 6.38t10.71 20.28l-26 1.53q-1-6-4.36-8.79t-9.19-2.74q-4.81 0-7.25 2a6.25 6.25 0 0 0-2.44 5 5 5 0 0 0 2 3.85q1.95 1.77 9.27 3.29 18.12 3.9 26 7.9t11.4 9.91a25.15 25.15 0 0 1 3.57 13.24 28.35 28.35 0 0 1-4.75 15.86 29.83 29.83 0 0 1-13.3 11q-8.55 3.75-21.54 3.75-22.81 0-31.6-8.78T0 167.56zm163-7.01l24.22 7.32a44.72 44.72 0 0 1-7.69 17 33.46 33.46 0 0 1-13 10.31q-7.78 3.47-19.8 3.47-14.58 0-23.82-4.23t-16-14.91q-6.72-10.67-6.71-27.31 0-22.18 11.8-34.11t33.4-11.92q16.91 0 26.57 6.84t14.36 21l-24.4 5.43a21 21 0 0 0-2.68-6 16 16 0 0 0-5.67-4.88 16.31 16.31 0 0 0-7.51-1.71q-9.39 0-14.39 7.56-3.8 5.61-3.79 17.61 0 14.86 4.52 20.38t12.69 5.51q7.92 0 12-4.45t5.9-12.91zm45.51-52.83h27.63V139h30.2v-31.28h27.75v89.43h-27.75V161h-30.2v36.18h-27.63zm102.78 44.77q0-21.88 12.2-34.1t34-12.2q22.32 0 34.4 12T404 151.76q0 15.69-5.28 25.72a37.54 37.54 0 0 1-15.25 15.61q-10 5.58-24.86 5.58-15.12 0-25-4.82a37.59 37.59 0 0 1-16.07-15.25q-6.26-10.42-6.25-26.11zm27.63.13q0 13.55 5 19.46t13.7 5.91q8.91 0 13.79-5.79t4.88-20.8q0-12.63-5.1-18.46t-13.82-5.82A16.78 16.78 0 0 0 344 133q-5.07 6-5.08 19.62z"/><path d="M392.28 152.49q0-21.88 12.2-34.1t34-12.2q22.34 0 34.41 12t12.07 33.58q0 15.69-5.27 25.72a37.6 37.6 0 0 1-15.25 15.61q-10 5.58-24.86 5.58-15.13 0-25-4.82a37.67 37.67 0 0 1-16.08-15.25q-6.22-10.43-6.22-26.12zm27.64.13q0 13.55 5 19.46t13.72 5.92q8.91 0 13.79-5.79t4.88-20.8q0-12.63-5.09-18.46t-13.82-5.82A16.77 16.77 0 0 0 425 133q-5.09 6-5.08 19.62z"/><path d="M482.08 107.72h27.64v67.41h43.13v22h-70.77z"/></g></g></svg>'
        footerAnchorRS.node.setAttribute('href', 'https://rs.school/')
        footerAnchorRSS.node.setAttribute('href', 'https://rollingscopes.com/')
    }

    public filterByName(){
        this.buttonTypeOne.node.onclick = () =>{
        // setTimeout(() => {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[0]
            });

            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonTypeTwo.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[1]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonTypeThree.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[2]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonTypeFour.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[3]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonType5.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[4]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonType6.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[5]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonType7.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.shape == this.filterAll.name[6]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonColorOne.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.strength == this.filterAll.strenght[0]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonColorTwo.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.strength == this.filterAll.strenght[1]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonColorThree.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.strength == this.filterAll.strenght[2]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonSizeOne.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.cooler == this.filterAll.cooler[0]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonSizeTwo.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.cooler == this.filterAll.cooler[1]
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
        this.buttonPopular.node.onclick = ()=> {
            const filterByName = this.model.dataUrl.filter((card)=>{
                return card.favorite == true
            });
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(filterByName);
        }
    }
    public poisk (){
        this.lupa.node.onclick = ()=>{
            let d = (document.getElementById('input') as HTMLInputElement).value.trim().toLowerCase();
            const array = this.model.dataUrl.filter((data)=>{
                d == data.name.toLowerCase();
            })
            this.card(array);
            }
    }

    public reset(){
        this.filterButtonReset.node.onclick = ()=> {
            this.cardsCont.destroy();
            this.counter.destroy();
            this.card(this.model.dataUrl)
        }
    }
}

