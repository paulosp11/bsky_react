import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';


const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,       
      },
    },
  }),
)(TableRow);

function createData(proj_name: string, user: string, completed: string, action: string) {
  return { proj_name, user, completed, action };
}

const rows = [
  createData('BlueSky React', 'Paulo Lucas', 'Yes', 'Action' ),
  createData('BlueSky React', 'Paulo Lucas', 'Yes', 'Action' )
  
];

const useStyles = makeStyles({
  table: {
    width: '100%',       
  },
});


interface Todo {
  text: string;
  complete: boolean;
}

interface Props {
  todo: Todo;
}

export function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell align="center">User</StyledTableCell>
            <StyledTableCell align="center">Completed)</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.proj_name}>
              <StyledTableCell component="th" scope="row">
                {row.proj_name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.user}</StyledTableCell>
              <StyledTableCell align="center">{row.completed}</StyledTableCell>
            
              <IconButton aria-label="delete">
              <DeleteIcon />
              </IconButton>
              <IconButton aria-label="update">
              <UpdateIcon />
              </IconButton>              

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
 
}




export default TodoListItem