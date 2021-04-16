import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, Button, TextField } from "@material-ui/core";
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 300,
            flexGrow: 1,
            minWidth: 300,
            transform: "translateZ(0)",
            "@media all and (-ms-high-contrast: none)": {
                display: "none",
            },
        },
        modal: {
            display: "flex",
            padding: theme.spacing(1),
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            position: "absolute",
            width: 600,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        input: {
            height: "100px"
        }
    })
);
interface Props {
    open: boolean;
    handleClose: () => void;
    handleSubmit : (subject : string , body : string) => void 
}
export const DairyModal: React.FC<Props> = ({ open, handleClose , handleSubmit}) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [subject, setSubject] = useState<string>('')
    const [body, setBody] = useState<string>('')
    
    const handleClick=()=>{
        handleSubmit(subject,body)
        setBody('')
        setSubject('')
    }
    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        autoComplete="subject"
                        autoFocus
                        type="text"
                        value={subject}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setSubject(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="title"
                        label="Body"
                        type="text"
                        id="body"
                        multiline={true}
                        rows={5}
                        value={body}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setBody(e.target.value) }}
                    />
                    <Button variant="contained" color="primary" onClick={handleClick}>Create Diary</Button>
                </div>
            </Modal>
        </Box>
    );
};
