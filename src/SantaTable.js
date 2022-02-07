import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import React from 'react'

export default function SantaTable({columns, santa}) {
    return (
        <div>
            <TableContainer style={{ width: "90%", marginLeft:"5%", marginTop:"20px", marginBottom:"20px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow > 
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ color : "blue" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {santa.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}   
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
