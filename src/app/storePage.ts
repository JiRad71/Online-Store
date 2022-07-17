import Control from "../common/control";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
// import {data} from './data';

export class StorePage extends Control{
    res: number[];
    filterCont!: Control<HTMLElement>;
    valueRange: number[];
    constructor (parrentNode: HTMLElement){
        super (parrentNode);
        this.header();
        this.filter();
        this.res = [];
        this.valueRange = [];
        // this.range();
        
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
        const filterByShape = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Производитель');
        const buttonTypeOne = new Control(filterByShape.node, 'button', 'button-type', '');
        const buttonTypeTwo = new Control(filterByShape.node, 'button', 'button-type', '');
        const buttonTypeThree = new Control(filterByShape.node, 'button', 'button-type', '');
        const filterByColor = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Цвет');
        const buttonColorOne = new Control(filterByColor.node, 'button', 'button-color-one', '');
        const buttonColorTwo = new Control(filterByColor.node, 'button', 'button-color-two', '');
        const buttonColorThree = new Control(filterByColor.node, 'button', 'button-color-three', '');
        const filterBySize = new Control(filterBlocksOne.node, 'div', 'filter-by-shape', 'Размер');
        const buttonSizeOne = new Control(filterBySize.node, 'button', 'button-size-one', '');
        const buttonSizeTwo = new Control(filterBySize.node, 'button', 'button-size-two', '');
        const buttonSizeThree = new Control(filterBySize.node, 'button', 'button-size-three', '');
        const buttonPopular = new Control (filterBlocksOne.node, 'button', 'button-popular', '')
        const filterBlocksTwo = new Control(this.filterCont.node, 'div', `filter-block`, '');
        const filterTitleTwo = new Control(filterBlocksTwo.node, 'h4', 'filter-title', 'Фильтры по диапазону');
        const filterRangeTitleOne = new Control(filterBlocksTwo.node, 'h5', 'filter-range-title-one', 'Количество на складе:')
        const filterRange = new Control(filterBlocksTwo.node, 'div', 'filter-range', '')
        const filterRangeValue = new Control(filterBlocksTwo.node, 'div', 'filter-range-value-lower', '')
        filterRange.node.setAttribute('id', 'filterRange')
        const range: noUiSlider.target = document.getElementById('filterRange')!;
        noUiSlider.create(range , {
            start: [1, 20],
            connect: true,
            step: 1,
            range: {
                'min': 0,
                'max': 20
            }
        });

        filterRangeValue.node.setAttribute('id', 'filterRangeValue');
        const snapValues = document.getElementById('filterRangeValue')!;
        range.noUiSlider?.on('update', function (values: (string | number)[]):void {
            snapValues.innerHTML = values.join(' - ');
            let res: number[] = [];
            values.forEach((str)=>{res.push(Number(str.toString().replace('.00', '')))});
        });

        const filterRangeTitleTwo = new Control(filterBlocksTwo.node, 'h5', 'filter-range-title-one', 'Год выхода на рынок:')
        const filterRangeTwo = new Control(filterBlocksTwo.node, 'div', 'filter-range', '')
        const filterRangeValue2 = new Control(filterBlocksTwo.node, 'div', 'filter-range-value-upper', '')

        filterRangeTwo.node.setAttribute('id', 'filterRangeTwo')
        const rangeTwo: noUiSlider.target = document.getElementById('filterRangeTwo')!;
        noUiSlider.create(rangeTwo , {
            start: [2001, 2022],
            connect: true,
            step: 1,
            range: {
                'min': 2000,
                'max': 2022
            }
        });

        filterRangeValue2.node.setAttribute('id', 'filterRangeValue2');
        const snapValues2 = document.getElementById('filterRangeValue2')!;
        rangeTwo.noUiSlider?.on('update', function (values: (string | number)[]):void {
            snapValues2.innerHTML = values.join(' - ');
            let res: number[] = [];
            values.forEach((str)=>{res.push(Number(str.toString().replace('.00', '')))});
        });

        const filterBlocksThree = new Control(this.filterCont.node, 'div', `filter-block`, '');
        const filterByName = new Control(filterBlocksThree.node, 'div', `filter-name`, '');
        const filterTitleName = new Control(filterByName.node, 'h4', 'filter-title', 'Поиск');
        const filterInput = new Control(filterByName.node, 'input', 'filter-input', '');
        filterInput.node.setAttribute('placeholder', 'Введите текст')
        filterInput.node.setAttribute('type', 'text')
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
    // public range(){
        
    // }
}
