import React from 'react'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }),
);

export function FormPropsTextFields() {
      const classes = useStyles();

    return (
      
      <form className={classes.root} noValidate autoComplete="off"> 

          <TextField id="proj_name" 
            label="Projet Name" 
            style={{width: 500, margin:8}}            
            InputLabelProps={{shrink: true, }}
            variant="outlined"
          />       

          <TextField id="user" 
            label="User" 
            select
            style={{width: 200, margin:8}}           
            InputLabelProps={{shrink: true, }}
            variant="outlined"
          />        

          <FormControlLabel
            value="top"
            control={<Switch color="primary" />}
            label="Completed"
            labelPlacement="top"
          />         
      
      </form>    
    );

}


