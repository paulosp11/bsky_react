import {
  AppBar,
  Box,
  Button,
  createStyles,
  CssBaseline,
  Drawer,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GET_DIARY, UpdateDiary } from "../../features/diaries/diariesSlice";
import { Diary } from "../../interfaces/diary.interface";
import { DairyModal } from "../modal/modal";
import { useDispatch } from "react-redux";
import { clearToken, GET_AUTH } from "../../features/authSlice/authSlice";
import { createDiary } from "../../features/diaries/diariesSlice";
import { handleErrors } from "../../services/mirage/server";
import { useNavigate } from "react-router-dom";

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      [theme.breakpoints.down("sm")]: {
        width: `calc(160% - ${drawerWidth}px)`,
      },
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: "20px",
      [theme.breakpoints.down("sm")]: {
        width: drawerWidth - 100,
      },
    },
    // toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(5),
      paddingLeft: "50px",
    },
    btn: {
      textTransform: "capitalize",
      fontWeight: 600,
      borderRadius: "15px",
    },
    title: {
      fontWeight: 600,
      textTransform: "capitalize",
    },
  })
);

export const DiaryList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const classes = useStyles();
  const navigate = useNavigate();
  const diaries = useSelector(GET_DIARY);
  const dispatch = useDispatch();
  const { user } = useSelector(GET_AUTH);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(!updateOpen);
  };

  const handleModalOpen = (id: string) => {
    setUpdateOpen(true);
    setId(id);
  };

  const handleUpdateSubmit = (subject: string, body: string) => {
    if (subject === "" || body === "") {
      handleErrors(null, "one of the feilds are empty");
    } else {
      dispatch(
        UpdateDiary({
          id: id,
          subject: subject,
          title: body,
          type: "private",
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
        createDiary({
          subject: subject,
          title: body,
          type: "private",
          userId: user?.id,
        })
      );
      handleClose();
    }
  };
  const handleClick = () => {
    dispatch(clearToken());
  };
  return (
    <Box>
      <DairyModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />

      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" noWrap>
              Daily Diary
            </Typography>
            <Button
              onClick={handleClick}
              variant="text"
              style={{ color: "white" }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => {
              setOpen(!open);
            }}
          >
            create new
          </Button>
          {diaries.length > 0 &&
            diaries.map((diary: Diary) => {
              return (
                <Box
                  display="flex"
                  flexDirection="column"
                  boxShadow={5}
                  mt={2}
                  borderRadius="15px"
                >
                  <Box p={3}>
                    <Typography variant="h5" className={classes.title}>
                      {diary.subject}
                    </Typography>
                    <p>1 saved entries</p>
                    <Box display="flex" justifyContent="space-between">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => {
                          navigate(`/${diary.id}/entry`);
                        }}
                      >
                        add new entry
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => {
                          handleModalOpen(`${diary.id}`);
                        }}
                      >
                        update diary
                      </Button>
                    </Box>
                  </Box>
                  <DairyModal
                    open={updateOpen}
                    handleClose={handleUpdateClose}
                    handleSubmit={handleUpdateSubmit}
                  />
                </Box>
              );
            })}
        </Drawer>
        <div className={classes.content}></div>
      </div>
    </Box>
  );
};
