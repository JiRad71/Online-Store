import Control from "../common/control";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {DataModel} from './CardModal';

export class StorePage extends Control  {
    valueRangeQuantity: number[];
    filterCont!: Control<HTMLElement>;
    valueRangeSize: number[];
    data: DataModel;
    constructor (parrentNode: HTMLElement){
        super (parrentNode);
        this.header();
        this.filter();
        this.card();
        this.valueRangeQuantity = [];
        this.valueRangeSize = [];
        this.data = new DataModel();
        this.data.buildData().then(result=>{
        //    console.log(result.dataUrl)
        console.log(result.dataUrl)
        })
    }
    
    private header(){
        const header = new Control(this.node, 'div', 'header', '');
        new Control(header.node, 'div', 'logo', 'Online Store');
        const cart = new Control (header.node, 'img', 'imgLogo', '');
        cart.node.setAttribute("src", "../public/img/cart.jpg");
    }
    public filter(){
        this.filterCont = new Control (this.node, 'div', 'filter-cont','');
        const filterBlocksOne = new Control(this.filterCont.node, 'div', `filter-block`, '');
        const filterTitleOne = new Control(filterBlocksOne.node, 'h4', 'filter-title', 'Фильтр по значению');
        const filterByShape = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Производитель: ');
        const buttonTypeOne = new Control(filterByShape.node, 'button', 'button-type', 'Brusko');
        const buttonTypeTwo = new Control(filterByShape.node, 'button', 'button-type', 'Glitch Souse');
        const buttonTypeThree = new Control(filterByShape.node, 'button', 'button-type', 'Fruit Fresh');
        const buttonTypeFour = new Control(filterByShape.node, 'button', 'button-type', 'Maxwells');
        const filterByColor = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Крепость: ');
        const buttonColorOne = new Control(filterByColor.node, 'button', 'button-color-one', '20');
        const buttonColorTwo = new Control(filterByColor.node, 'button', 'button-color-two', '40');
        const buttonColorThree = new Control(filterByColor.node, 'button', 'button-color-three', '50');
        const filterBySize = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Куллер: ');
        const buttonSizeOne = new Control(filterBySize.node, 'button', 'button-size-one', 'Есть');
        const buttonSizeTwo = new Control(filterBySize.node, 'button', 'button-size-two', 'Нет');
        const buttonPopular = new Control (filterBlocksOne.node, 'button', 'button-popular', 'Популярные')
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

        const filterRangeTitleTwo = new Control(filterBlocksTwo.node, 'h5', 'filter-range-title-one', 'Год выхода на рынок:')
        const filterRangeTwo = new Control(filterBlocksTwo.node, 'div', 'filter-range', '')
        const filterRangeValue2 = new Control(filterBlocksTwo.node, 'div', 'filter-range-value-upper', '')

        filterRangeTwo.node.setAttribute('id', 'filterRangeTwo')
        const rangeTwo: noUiSlider.target = document.getElementById('filterRangeTwo')!;
        noUiSlider.create(rangeTwo , {
            start: [30, 50],
            connect: true,
            step: 10,
            range: {
                'min': 30,
                'max': 50
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
        const filterInput = new Control(filterByName.node, 'input', 'filter-input', '');
        filterInput.node.setAttribute('placeholder', 'Введите текст')
        filterInput.node.setAttribute('type', 'text')
        filterInput.node.focus();
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
        const filterButtonReset = new Control (filterBlocksThree.node, 'button', 'filter-button-reset', 'Сбросить фильтры')
        const filterButtonSettings = new Control (filterBlocksThree.node, 'button', 'filter-button-settings', 'Сбросить настройки')
    }
    public card(){
        const cardsCont = new Control (this.node, 'div','cards-Cont','')
        this.data.dataUrl.forEach((data, i)=>{
        const cards = new Control (cardsCont.node, 'div','cards','')
        new Control(cards.node, 'div','cardsTitle',`${data.name[i]}`)
        const cardImage = new Control(cards.node, 'img','cardsImage','')
        cardImage.node.setAttribute('src', `../asset/resourses/${i}.jpg`)
        new Control(cards.node, 'div','cardsQuantity',`${data.quantity[i]}`)
        new Control(cards.node, 'div','cardsStrength',`${data.strength[i]}`)
        new Control(cards.node, 'div','cardsShape',`${data.shape[i]}`)
        let cardFavorite:string;
        // if (data.favorite[i] === false) {cardFavorite="Нет"}
        // else {cardFavorite="Да"}
        // new Control(cards.node, 'div','cardsFavorite',`${cardFavorite}`)
        new Control(cards.node, 'div','cardsSize',`${data.size[i]}`)
        })
    }
}
