const selectType = {
    NAV: "Navigation graphic",
    FLOOR:"Floor plan",
    PLANT:"Plant graphic"
}

const tested = {
    OK: "OK",
    FAULTS:"Faults"
}

const state = {
    NOT_STARTED:"Not started",
    IN_PROGRESS:"In progress",
    FINISHED:"Finished",
    ISSUES:"Issues"
}

const roles = {
    ADMIN: "Administrator",
    GECC: "GECC",
    SIEMENS:"Siemens",
    PLANER: "Planer",
    NONE: "Default",
}

module.exports = {
    selectType,
    tested,
    state,
    roles
}
