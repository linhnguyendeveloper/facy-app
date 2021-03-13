
export  const exportExcel = (workbook,fileName)=> {
    workbook.xlsx
    .writeBuffer()
    .then(data => {
      console.log("file is written");
      const blob = new Blob([data],
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${fileName}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.log(err);
    });
}