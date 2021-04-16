import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import IconButton from '@material-ui/core/IconButton';

// Import interfaces
import { TodoItemInterface } from '../interfaces'



interface ITodo {
  rows: Array<{
    id: string;
    projName: string;
    userName: string;
    isComplete: string;
  }>;
}

export function TodoItem({ rows }: ITodo) {
  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Completed?</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.projName}</TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.isComplete}</TableCell>

              <TableCell>

              <IconButton onClick={() => handleTodoRemove(todo.id)} aria-label="delete">
                  <DeleteIcon />
              </IconButton>
              <IconButton aria-label="update" >
                  <UpdateIcon />
              </IconButton> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>  
   
  );
}




