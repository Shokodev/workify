const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const path = require('path');
const exceljs = require('exceljs');
const { Posts } = require('../../mongodb');

// Get data in excel sheet
router.get('/',async (req, res) => {
    logger.info('fetch all posts in excel sheet');
    try{

        const excelContentData = await Posts.find({})
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "graphics.xlsx"
        );
        let workbook = new exceljs.Workbook();
        let worksheet = workbook.addWorksheet('Graphics');
        worksheet.addTable({
            name: 'graphics',
            ref: 'A3',
            headerRow: true,
            totalsRow: false,
            style: {
                theme: 'TableStyleMedium6',
                showRowStripes: true,
            },
            columns: [
                {name: 'Graphics', filterButton: true},
                {name: 'Type', filterButton: true,},
                {name: 'GECC State', filterButton: true},
                {name: 'Regulations', filterButton:true},
                {name: 'Finished by GECC at', filterButton: true},
                {name: 'Creator', filterButton: true},
                {name: 'GECC comments', filterButton: true},
                {name: 'Siemens State', filterButton: true},
                {name: 'Ok by Siemens at', filterButton: true},
                {name: 'Auditor Siemens', filterButton: true},
                {name: 'Siemens comments', filterButton: true},
                {name: 'Planer State', filterButton: true},
                {name: 'Ok by Planer at', filterButton: true},
                {name: 'Auditor Planer', filterButton: true},
                {name: 'Planer comments', filterButton: true},
                {name: 'Closed at', filterButton: true},
               
            ],
            rows:[],
        });
        const graphicsTable = worksheet.getTable('graphics');
        excelContentData.forEach(data => {
            graphicsTable.addRow([
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
            ],0);
        });
        graphicsTable.commit();
        worksheet.getCell('A1').value = '="Selected:       "&TEILERGEBNIS(3;A4:A999999)';
        worksheet.mergeCells('A2:G2');
        worksheet.getCell('G2').value = 'GECC';
        worksheet.getCell('A1').fill = {argb:'FFFF0000'};
        worksheet.mergeCells('H2:K2');
        worksheet.getCell('K2').value = 'Siemens';
        worksheet.mergeCells('L2:O2');
        worksheet.getCell('O2').value = 'Planer';
        worksheet.getCell('P2').value = 'Graphic ready';
        worksheet.columns = [
            {key: 'Graphics', width: 35},
            {key: 'Type', width: 35,},
            {key: 'GECC State', width: 35},
            {key: 'Regulations', width:35},
            {key: 'Finished by GECC at', width: 35},
            {key: 'Creator', width: 35},
            {key: 'GECC comments', width: 35},
            {key: 'Siemens State', width: 35},
            {key: 'Ok by Siemens at', width: 35},
            {key: 'Auditor Siemens', width: 35},
            {key: 'Siemens comments', width: 35},
            {key: 'Planer State', width: 35},
            {key: 'Ok by Planer at', width: 35},
            {key: 'Auditor Planer', width: 35},
            {key: 'Planer comments', width: 35},
            {key: 'Closed at', width: 35},
        ];
        await workbook.xlsx.writeFile("./exports/graphics.xlsx").then(function () {
            logger.info('Excel file saved');
            res.download(path.join(__dirname, '../../../exports/graphics.xlsx'));
        });
    } catch (err){
        logger.error('failed to create excel: ' + err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;
