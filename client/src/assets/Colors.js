
const colorsArray = [
    '#C0392B',
    '#cb584d',
    '#9B59B6',
    '#2980B9',
    '#48C9B0',
    '#2ECC71',
    '#F1C40F',
    '#F39C12',
    '#D35400',
    '#94bdbd',
    '#95a5a6',
    '#4c5252',
    '#5f6b6b',
    '#34495E',
]


class Colors{

    static getColors(amount, offset){
        while(amount > colorsArray.length) {
            colorsArray.push(...colorsArray)
        }
        return colorsArray.slice(offset, amount + offset);

    }
}


export default Colors;
