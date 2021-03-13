import React from 'react'
import { Button } from 'antd'
import Excel from 'exceljs'
import { exportExcel } from '../../../../utils/exportExcel'
import { FileExcelOutlined } from '@ant-design/icons'
import moment from 'moment'
import './ExportExcel.scss'

const ExportExcel = ({ data, columns ,fileName}) => {
  const handleExport = () => {
    let keys = Object.keys(data[0])
    let sheetColumns = []
    keys.forEach(col => {
      const colHeader = columns.find(item => item.key === col)?.title
      colHeader &&
        sheetColumns.push({
          header: colHeader,
          key: col
        })
    })
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet()
    worksheet.columns = sheetColumns
    worksheet.getColumn(3).width = 20;// column B
    data.forEach(item => worksheet.addRow(item))
    exportExcel(workbook, fileName + moment().format('DD-MM-YYYY'))
  }
  
  return (
    <Button
      className='export-excel'
      onClick={handleExport}
    >
      Get Your Attendance Report
      <FileExcelOutlined className="file-excel-outlined" />
    </Button>
  )
}

export default ExportExcel
