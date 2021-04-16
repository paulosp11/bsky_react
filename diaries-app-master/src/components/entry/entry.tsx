import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createDiaryEntry,
  GET_ENTRIES,
  updateDairyEntry,
} from "../../features/entrySlice/entrySlice";
import { handleErrors } from "../../services/mirage/server";
import { Header } from "../header/header";
import { EntryModal } from "../modal/entrymodal";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    textAlign: "left",
  },
});
export const Entry = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [entryId, setEntryId] = useState<string>("");

  const dispatch = useDispatch();
  const allEntries = useSelector(GET_ENTRIES);
  const entries = allEntries.filter((entry) => entry.diaryId === id);

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateSubmit = (subject: string, body: string) => {
    if (subject === "" || body === "") {
      handleErrors(null, "one of the feilds are empty");
    } else {
      dispatch(
        updateDairyEntry({
          params: entryId,
          title: subject,
          content: body,
        })
      );
    }
    handleUpdateClose();
  };

  const handleSubmit = (subject: string, body: string) => {
    if (subject === "" || body === "") {
      handleErrors(null, "one of the feilds are empty");
    } else {
      dispatch(
        createDiaryEntry({
          params: id,
          title: subject,
          content: body,
        })
      );
    }
    handleClose();

  };
  const date = (date: any) => {
    const reqdate = Date.parse(date);
    return new Date(reqdate).toLocaleTimeString();
  };
  console.log("entry by user id", entries);
  console.log(open);
  return (
    <div>
      <Header />
      <Box>
        <EntryModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
        <Box m={5} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Create New Entry
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
          {entries.length > 0 &&
            entries.map((entry, index) => {
              return (
                <>
                  <Box
                    minWidth="300px"
                    m={5}
                    key={index}
                    boxShadow={5}
                    p={3}
                    display="flex"
                    flexDirection="column"
                    borderRadius={10}
                  >
                    <Typography className={classes.title} variant="h5">
                      {entry.title}
                    </Typography>
                    <Typography variant="subtitle1">{entry.content}</Typography>
                    <Box mt={1} display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        Created at: {date(entry.createdAt)}
                      </Typography>
                      <Box pl={5}></Box>
                      <Typography variant="subtitle2">
                        Updated at:{date(entry.updatedAt)}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setEntryId(`${entry.id}`)
                        setOpenUpdate(true);
                      }}
                    >
                      update
                    </Button>
                  </Box>
                  <EntryModal
                    open={openUpdate}
                    handleClose={handleUpdateClose}
                    handleSubmit={handleUpdateSubmit}
                  />
                </>
              );
            })}
        </Box>
      </Box>
    </div>
  );
};
