import Markdown from "markdown-to-jsx";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateDiary } from "../../Features/Diary/diarySlice";
import {
  setCanEdit,
  setCurrentlyEditing,
} from "../../Features/Entry/editorSlice";
import { updateEntry } from "../../Features/Entry/entrySlice";
import { Diary, Entry } from "../../Interface/type";
import { RootState } from "../../RootReducer";
import http from "../../Service/api";
import { useAppDispatch } from "../../store";
import { showAlert } from "../../util";

const Editor = () => {
  const { activeDiaryId, canEdit, currentlyEditing: entry } = useSelector(
    (state: RootState) => state.editor
  );
  let [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useAppDispatch();

  const saveEntry = async () => {
    if (activeDiaryId == null) {
      return showAlert("Please select a diary", "warning");
    }
    if (entry == null) {
      console.log(activeDiaryId, editedEntry);
      http
        .post<Entry, { entry: Entry; diary: Diary }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http
        .put<Entry, Entry>(`/diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry != null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateEntry(_entry));
          }
        });
    }
    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);
  return (
    <div style={{ width: "75vw" }}>
      <div className="mr-3 mt-5" style={{ width: "70vw" }}>
        {entry && !canEdit ? (
          <div className="d-flex align-items-center justify-content-around">
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {entry?.title}
            </span>
            <span
              onClick={() => {
                if (entry !== null) {
                  dispatch(setCanEdit(true));
                }
              }}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              (Edit)
            </span>
          </div>
        ) : (
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label
                className="mb-0"
                style={{ fontSize: "0.9rem", fontWeight: "bold" }}
              >
                Title
              </Form.Label>
              <Form.Control
                value={editedEntry?.title}
                onChange={(e) => {
                  const newEntry: any = { ...editedEntry };
                  newEntry.title = e.target.value;
                  updateEditedEntry(newEntry);
                }}
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Form>
        )}
      </div>
      <div className="mr-3" style={{ width: "70vw" }}>
        {entry && !canEdit ? (
          <Markdown style={{ margin: "10px 20px" }}>{entry?.content}</Markdown>
        ) : (
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label
                className="mb-0"
                style={{ fontSize: "0.9rem", fontWeight: "bold" }}
              >
                Content
              </Form.Label>
              <Form.Text className="text-muted">Markdown Supported</Form.Text>
              <Form.Control
                placeholder="Enter Content"
                style={{ resize: "none" }}
                as="textarea"
                rows={10}
                value={editedEntry?.content}
                onChange={(e) => {
                  const newEntry: any = { ...editedEntry };
                  newEntry.content = e.target.value;
                  updateEditedEntry(newEntry);
                }}
              />
            </Form.Group>
          </Form>
        )}
      </div>
      <div className="text-center">
        <Button onClick={saveEntry} variant="primary" type="submit">
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default Editor;
