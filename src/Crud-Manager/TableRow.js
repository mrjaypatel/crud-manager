import { Button } from '@mui/material';
import React from 'react'
import EditRow from './EditRow';
function TableRow(props) {
  var row = [];
  const readBlock = (props.readBlock) ? props.readBlock : [];
  const editBlock = (props.editBlock) ? props.editBlock : [];
  function getCellArray() {
    Object.keys(props.data).forEach((key) => {
      console.log(readBlock);
      if (!Object.values(readBlock).includes(key)) {
        Object.entries(props.data).forEach((entry) => {
          if (key === entry[0]) {
            row.push(entry[1]);
          }
        })
      }
    })
  }
  function removeRow() { }
  getCellArray();
  return (
    <tr>
      {
        row.map((data, index) => {
          return <td key={index}>{data}</td>
        })
      }
      {(props.manage) ? <>
        <td>
          <Button onClick={() => removeRow()}> Delete</Button>
        </td>
        <td>
          <EditRow data={props.data} editBlock={editBlock} />
        </td>
      </> : ""
      }
    </tr>
  )
}
export default TableRow