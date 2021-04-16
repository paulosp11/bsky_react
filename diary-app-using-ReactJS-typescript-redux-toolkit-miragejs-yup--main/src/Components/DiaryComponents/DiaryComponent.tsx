import React, { FC, useState } from "react";
import { Diary } from "../../Interface/type";
import { Button, Form } from "react-bootstrap";
import http from "../../Service/api";
import { useAppDispatch } from "../../store";
import { updateDiary } from "../../Features/Diary/diarySlice";
import { showAlert } from "../../util";
import { Link } from "react-router-dom";
import {
  setActiveDiaryId,
  setCanEdit,
  setCurrentlyEditing,
} from "../../Features/Entry/editorSlice";

interface diaryProp {
  diary: Diary;
}

const DiaryComponent: FC<diaryProp> = (props) => {
  let [isEditing, setEditing] = useState(false);
  let [diary, setDiary] = useState(props.diary);
  const dispatch = useAppDispatch();
  let totalEntries = props.diary?.entryIds?.length;

  let saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Saved!", "success");
        }
      })
      .finally(() => {
        setEditing(false);
      });
  };
  return (
    <div>
      <div
        title="Click to Edit"
        style={{ cursor: "pointer" }}
        onClick={() => setEditing(true)}
        className="mt-2"
      >
        {isEditing ? (
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>Enter new title</Form.Label>
              <Form.Control
                value={diary?.title}
                onChange={(e: any) => {
                  setDiary({ ...diary, title: e.target.value });
                }}
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>
            <Button onClick={saveChanges}>Save</Button>
          </Form>
        ) : (
          <span style={{ color: "#007bff", fontWeight: "bold" }}>
            {diary.title.toUpperCase()}
          </span>
        )}
      </div>
      <p style={{ fontSize: "0.7rem" }}>
        {totalEntries ? `${totalEntries}` : 0} saved entries
      </p>
      <div className="d-flex align-items-center ">
        <Button
          size="sm"
          style={{ fontSize: "0.8rem" }}
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add Entry
        </Button>
        <Link
          style={{
            fontSize: "0.8rem",
            textDecoration: "none",
            marginLeft: "5px",
          }}
          to={`/diaries/${diary.id}`}
        >
          View Entries
        </Link>
      </div>
    </div>
  );
};

export default DiaryComponent;
