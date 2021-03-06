import React,{useMemo} from 'react';
import {useTable} from "react-table";
import {COLUMNS} from "./columns.js";
import "./Result.css"
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
 
const Result = ({output}) => {
  const columns=useMemo(()=>COLUMNS,[]);

  // creating instance of the table
  const tableInstance=useTable({
    columns:columns,
    data:output,
  })

  // destructuring the functions and arrays provided by the useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return <>
   <div className={`result`}>
      <Zoom center>
        <label style={{color: 'white'}}>RESULT TABLE</label>
      </Zoom>
      <Fade bottom big>
          <table {...getTableProps()} >
            <Zoom center>
              <thead>
                {headerGroups.map((headerGroup,i)=>(
                  <tr {...headerGroup.getHeaderGroupProps()} key={i} >
                    {
                      headerGroup.headers.map((column,i)=>{
                        // console.log(column)
                        if(column['Header']==="Found"){
                          return <></>
                        }
                        return <th {...column.getHeaderProps()} key={i} >{column.render('Header')}</th>
                      })
                    }
                  </tr>
                ))}
              </thead>
            </Zoom>
            <tbody {...getTableBodyProps()} >
              {
                rows.map((row,i)=>{
                  prepareRow(row)

                  let make_red=false
                  if(row['values']['found']==='false'){
                    make_red=true;
                  }

                  return (
                    <Fade left key={i} >
                        <tr {...row.getRowProps()} style={make_red && {background: "#c93347"}} key={i} >
                        {
                          row.cells.map((cell,i)=>{
                            if(cell['column']['Header']==="Found"){
                              return <></>
                            }
                            return <>
                              <td {...cell.getCellProps()} key={i} >{cell.render('Cell')}</td>
                            </>
                          })
                        }
                      </tr>
                    </Fade>
                  )
                })
              }
            </tbody>
          </table> 
      </Fade>
    </div>
  </>
}

export default Result;
