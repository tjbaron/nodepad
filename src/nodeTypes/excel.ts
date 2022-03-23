import Excel from "exceljs";

export const excelNodeTypes = [
    {
        type: "excel_open",
        label: "excel_open",
        description: "Opens an Excel file",
        inputs: (ports: any) => [
            { name: 'file', label: 'file', type: 'filearray' },
        ],
        outputs: (ports: any) => [
            { name: 'excel', label: 'excel', type: 'any' },
        ],
        code: async ({file}: any) => {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.onload = async (event) => {
                    console.log(reader.result);
                    const workbook = new Excel.Workbook();
                    await workbook.xlsx.load(reader.result as ArrayBuffer);
                    resolve({excel: workbook});
                }
                reader.readAsArrayBuffer(file[0]); 
            }); 
        },
    },
    {
        type: "excel_value",
        label: "excel_value",
        description: "Gets value from Excel cell",
        inputs: (ports: any) => [
            { name: 'excel', label: 'excel', type: 'any' },
            { name: 'sheet', label: 'sheet', type: 'number' },
            { name: 'row', label: 'row', type: 'number' },
            { name: 'column', label: 'column', type: 'number' },
        ],
        outputs: (ports: any) => [
            { name: 'value', label: 'value', type: 'string' },
        ],
        code: async ({excel, sheet, row, column}: any) => {
            const worksheet = excel.worksheets[sheet];
            const wsRow = worksheet.getRow(row);
            const wsCell = wsRow.getCell(column);
            return {value: wsCell.value};
        },
    },
];
