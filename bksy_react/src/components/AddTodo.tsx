import * as React from "react";
import Button from '@material-ui/core/Button';
import { Form, Formik, Field } from "formik";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MyField } from "./MyField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import SearchBar from "material-ui-search-bar";



interface Values {
  projName: string;
  userName: string;
  isComplete: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}


export const AddTodo: React.FC<Props> = ({ onSubmit }) => {

  return (
    <Formik
      initialValues={{ projName: "", userName: "", isComplete: "" }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values }) => (
        <Form>
        
          <Field
              name="projName"
              placeholder="Project"
              style={{width: 500, margin:8}}           
              InputLabelProps={{shrink: true, }}
              variant="outlined"
              component={MyField}
          />     

          <Field 
            name="userName" 
            placeholder="User"
            style={{width: 200, margin:8}}           
            InputLabelProps={{shrink: true, }}
            variant="outlined"
            component={MyField}
          />        

          <FormControlLabel name="isComplete"        
            value="top"
            control={<Switch color="primary" />}
            label="Completed"
            labelPlacement="top"
          />                     
                 
          <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"        
              startIcon={<SaveIcon />}>
             Add Task
            </Button>

          {/* <pre>{JSON.stringify(values, null, 2)}</pre>  */}
        </Form>
      )}
    </Formik>
  );
};


/* const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
        
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
  )
}

export default AddTodo
 */