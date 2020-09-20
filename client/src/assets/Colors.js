
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
    '#ECF0F1',
    '#95A5A6',
    '#95A5A6',
    '#7F8C8D',
    '#34495E',
]


class Colors{

    static getColors(amount){
        while(amount > colorsArray.length) {
            colorsArray.push(...colorsArray)
        }
        return colorsArray.slice(0, amount)

    }
}


export default Colors;