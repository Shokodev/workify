const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const path = require('path');
const exceljs = require('exceljs');
const { loadPostsCollection } = require('../../mongodb');

// Get data in excel sheet
router.get('/',async (req, res) => {
    logger.info('fetch all posts in excel sheet');
    try{
        const posts = await loadPostsCollection();
        const excelContentData = await posts.find({}).toArray();
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
                {name: 'Regulations', filterButton:true},
                {name: 'Date', filterButton: true},
                {name: 'Editor', filterButton: true},
                {name: 'State', filterButton: true},
                {name: 'Comments', filterButton: true},
            ],
            rows:[
                [' ', ' '],
            ],
        });
        const graphicsTable = worksheet.getTable('graphics');
        console.log(excelContentData.length);
        excelContentData.forEach(data => {
            graphicsTable.addRow([
                data.item.graphic,
                data.item.selectType,
                data.item.regulations,
                data.item.date,
                data.item.editor,
                data.item.selectState,
                data.item.comments,
            ],0);
        });
        graphicsTable.commit();
        worksheet.getCell('A1').value = 'Total graphics:';
        worksheet.getCell('B1').value = excelContentData.length;
        worksheet.mergeCells('A2:G2');
        worksheet.getCell('G2').value = 'Sofia';
        worksheet.columns = [
            {key: 'Graphics', width: 35 },
            {key: 'Type', width: 35 },
            {key: 'Regulations', width: 15 },
            {key: 'Date', width: 20 },
            {key: 'Editor', width: 20 },
            {key: 'State', width: 25 },
            {key: 'Comments', width: 50 },
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
