import React,{useMemo} from 'react';
import {useTable} from "react-table";
import {COLUMNS} from "./columns.js";
// import MOCK_DATA from "../MOCK_DATA.json";
import "./Result.css"

const Result = ({output}) => {
  // console.log("inside result.js",output);
  // const data=useMemo(()=>output,[]);
  const columns=useMemo(()=>COLUMNS,[]);
  // console.log("inside result.js",data);

  const tableInstance=useTable({
    columns:columns,
    data:output
  })

  // these are functions and arrays provided by useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return <>
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map((headerGroup)=>(
          <tr {...headerGroup.getHeaderGroupProps()} >
            {
              headerGroup.headers.map((column)=>(
                <th {...column.getHeaderProps()} >{column.render('Header')}</th>
              ))
            }
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()} >
        {
          rows.map((row)=>{
            prepareRow(row)
            return (
                <tr {...row.getRowProps()} >
                  {
                    row.cells.map((cell)=>{
                      return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                    })
                  }
                </tr>
            )
          })
        }
      </tbody>
    </table> 
  </>
}

export default Result;
