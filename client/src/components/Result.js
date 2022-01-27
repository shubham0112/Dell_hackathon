import React,{useMemo} from 'react';
import {useTable} from "react-table";
import {COLUMNS} from "./columns.js";
// import MOCK_DATA from "../MOCK_DATA.json";
import "./Result.css"
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
 
const bounceAnimation = keyframes`${bounce}`;
 
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

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
   <div  className={`result`}>
   <Zoom center>
      <label style={{color: 'white'}}>RESULT TABLE</label>
    </Zoom>
          <Fade bottom big>
              <table {...getTableProps()} >
                <Zoom center>
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
              </Zoom>
              <tbody {...getTableBodyProps()} >
                {
                  rows.map((row)=>{
                    prepareRow(row)
                    return (
                      <Fade left>
                          <tr {...row.getRowProps()} >
                          {
                            row.cells.map((cell)=>{
                              return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
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
