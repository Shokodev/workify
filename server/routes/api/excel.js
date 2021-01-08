const express = require("express");
const router = express.Router();
const logger = require("../../serverlog/logger");
const path = require("path");
const exceljs = require("exceljs");
const { Posts } = require("../../mongodb");
const moment = require("moment");
const { tested } = require('../../utils/postmanifest');
moment.locale("en-en");

// Get data in excel sheet
router.get("/", async(req, res) => {
    logger.info("fetch all posts in excel sheet");
    try {
        const excelContentData = await Posts.find({});
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "graphics.xlsx"
        );
        let workbook = new exceljs.Workbook();
        let worksheet = workbook.addWorksheet("Graphics");
        worksheet.addTable({
            name: "graphics",
            ref: "A4",
            headerRow: true,
            totalsRow: false,
            style: {
                theme: "TableStyleMedium6",
                showRowStripes: true,
            },
            columns: [
                { name: "Graphics", filterButton: true },
                { name: "Type", filterButton: true },
                { name: "GECC State", filterButton: true },
                { name: "Regulations", filterButton: true },
                { name: "Finished by GECC at", filterButton: true },
                { name: "Creator", filterButton: true },
                { name: "GECC comments", filterButton: true },
                { name: "Siemens State", filterButton: true },
                { name: "Ok by Siemens at", filterButton: true },
                { name: "Auditor Siemens", filterButton: true },
                { name: "Siemens comments", filterButton: true },
                { name: "Planer State", filterButton: true },
                { name: "Ok by Planer at", filterButton: true },
                { name: "Auditor Planer", filterButton: true },
                { name: "Planer comments", filterButton: true },
                { name: "Finished", filterButton: true },
            ],
            rows: [],
        });
        const graphicsTable = worksheet.getTable("graphics");
        excelContentData.forEach((data) => {
            graphicsTable.addRow(
                [
                    data.item.graphic,
                    data.item.selectType,
                    data.item.selectState,
                    data.item.regulations,
                    data.meta.finished_at,
                    data.item.creator,
                    data.item.comments,
                    data.item.selectSiemensTested,
                    data.meta.okBySiemens_at,
                    data.item.siemensAuditor,
                    data.item.siemensComments,
                    data.item.selectPlanerTested,
                    data.meta.okByPlaner_at,
                    data.item.planer,
                    data.item.planerComments,
                    isGraphicReady(data.item)
                ],
                0
            );
        });
        graphicsTable.commit();
        worksheet.getCell("A1").value = "Export of all graphics";
        worksheet.getCell("G1").value = new moment(new Date()).format("LL");
        worksheet.getRow(1).font = {
            family: 2,
            size: 26,
        };
        worksheet.getCell("A2").value =
            "Total exported:    " + excelContentData.length;
        worksheet.getRow(3).alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
        worksheet.getRow(3).font = {
            family: 2,
            size: 14,
        };
        worksheet.mergeCells("A3:G3");
        worksheet.getCell("G3").value = "GECC";
        worksheet.mergeCells("H3:K3");
        worksheet.getCell("K3").value = "Siemens";
        worksheet.mergeCells("L3:O3");
        worksheet.getCell("O3").value = "Planer";
        worksheet.getCell("P3").value = "Ready";
        worksheet.columns = [
            { key: 'Graphics', width: 20 },
            { key: 'Type', width: 20, },
            { key: 'GECC State', width: 15 },
            { key: 'Regulations', width: 15 },
            { key: 'Finished by GECC at', width: 15 },
            { key: 'Creator', width: 15 },
            { key: 'GECC comments', width: 25 },
            { key: 'Siemens State', width: 20 },
            { key: 'Ok by Siemens at', width: 15 },
            { key: 'Auditor Siemens', width: 15 },
            { key: 'Siemens comments', width: 25 },
            { key: 'Planer State', width: 20 },
            { key: 'Ok by Planer at', width: 15 },
            { key: 'Auditor Planer', width: 15 },
            { key: 'Planer comments', width: 25 },
            { key: 'Closed at', width: 15 },
        ];
        await workbook.xlsx.writeFile("./exports/graphics.xlsx").then(function() {
            logger.info("Excel file saved");
            res.download(path.join(__dirname, "../../../exports/graphics.xlsx"));
        });
    } catch (err) {
        logger.error("failed to create excel: " + err.message);
        res.status(500).send(err.message);
    }
});

function isGraphicReady(item) {
    if (item.selectPlanerTested === tested.OK) {
        return "YES"
    }
    return "NO"
}
module.exports = router;