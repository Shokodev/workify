
const { uniqueNamesGenerator, adjectives, colors,
    animals, starWars, countries, names } = require('unique-names-generator');

//post manifest
const postTypes = require('../../utils/postmanifest');
const { Posts } = require('../../mongodb');

async function generateRandomEntries(countOfRandomEntries) {
    for (let i = 0; i < countOfRandomEntries; i++) {
        await Posts.create(
            generateRandomObject()
        );
    }
    return true;
}

async function deleteAllEntries() {
    await Posts.deleteMany({});
    return true;
}

function generateRandomObject(){
    let object = {
        meta: {}
    }
    let creationDate = getRandomCreationDate();
    let updatedAtDate = addDays(creationDate, getRandomInt(1,50));
    let updatedAtDate2 = addDays(updatedAtDate, getRandomInt(1,10));
    object.item = {
        graphic: uniqueNamesGenerator({
            dictionaries: [adjectives, names],
            separator: " "
        }),
        selectType:getRandomSelectType(),
        selectState: getRandomSelectState(),
        regulations: Math.floor(Math.random() * 6) + 1,
        date: parseDate(creationDate),
        creator: uniqueNamesGenerator({
            dictionaries: [starWars],
        }),
        comments: uniqueNamesGenerator({
            dictionaries: [adjectives, countries, colors, animals],
            separator: " "
        }),
        siemensDate: randomNull(parseDate(updatedAtDate)),
    }
    object.meta.testCreationDate = creationDate;
    if(object.item.selectState === postTypes.state.FINISHED){
        object.meta.finished_at = creationDate;
    }
    if(object.item.siemensDate !== null){
        object.item.selectSiemensTested =  getSelectAuditTested();
        object.item.siemensAuditor =  uniqueNamesGenerator({
            dictionaries: [starWars],
        });
        object.item.siemensComments = uniqueNamesGenerator({
            dictionaries: [adjectives, countries, colors, animals],
            separator: " "
        });
        object.item.planerDate = randomNull(parseDate(updatedAtDate2));
        if(object.item.selectSiemensTested === postTypes.state.OK){
            object.meta.okBySiemens_at = updatedAtDate;
        }
    }

    if(object.item.planerDate !== null && object.item.siemensDate !== null) {
        object.item.selectPlanerTested =  getSelectAuditTested();
        object.item.planer =  uniqueNamesGenerator({
            dictionaries: [starWars],
        });
        object.item.planerComments =  uniqueNamesGenerator({
            dictionaries: [adjectives, countries, colors, animals],
            separator: " "
        });
        if(object.item.selectPlanerTested  === postTypes.tested.OK){
            object.meta.okByPlaner_at = updatedAtDate2;
            if((object.item.selectSiemensTested === postTypes.tested.OK) && (object.item.selectState === postTypes.state.FINISHED)){
               object.meta.closed_at =  updatedAtDate2;
            }
        }


    }
    return object
}

function getRandomSelectType(){
    let str1 = postTypes.selectType.FLOOR;
    let str2 = postTypes.selectType.PLANT;
    let str3 = postTypes.selectType.NAV;
    let x = Math.random();
    if(x<0.2){
        return str1;
    } else if(x>0.7){
        return str2;
    } else return str3;
}

function getRandomSelectState(){
    let str1 = postTypes.state.NOT_STARTED;
    let str2 = postTypes.state.IN_PROGRESS;
    let str3 = postTypes.state.FINISHED;
    let str4 = postTypes.state.ISSUES;
    let x = Math.random();
    if(x<0.25){
        return str1;
    } else if(x<0.5){
        return str2;
    } else if(x<0.75) {
        return str3;
    } else return str4

}

function getRandomCreationDate(){
    let start = new Date(2020, 1, 1);
    let end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function parseDate(date) {
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}

function randomNull(value) {
    let x = Math.random();
    if(x>0.77){
        return null
    } else return value;
}

function getSelectAuditTested(){
    let str1 = postTypes.tested.OK;
    let str2 = postTypes.tested.FAULTS;

    let x = Math.random();
    if(x<0.5){
        return str1;
    } else return str2
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

module.exports = {deleteAllEntries, generateRandomEntries}
