import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setUser } from "../../Features/Auth/userSlice";
import { addDiary } from "../../Features/Diary/diarySlice";
import { Diary, User } from "../../Interface/type";
import { RootState } from "../../RootReducer";
import http from "../../Service/api";
import { useAppDispatch } from "../../store";
import DiaryComponent from "./DiaryComponent";
import { setAuthState } from "../../Features/Auth/authSlice";

interface modalProp {
  show: boolean;
  onHide: () => void;
}

function MyVerticallyCenteredModal(props: modalProp) {
  let [diaryTitle, setDiaryTile] = useState("");
  let [diarytype, setDiaryType] = useState("");
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Diary[]>(`/diaries/${user.id}`).then((data) => {
          if (data && data.length) {
            const sortByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addDiary(sortByUpdatedAt));
            console.log(sortByUpdatedAt);
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user]);
  const saveDiary = async () => {
    console.log(diaryTitle, diarytype);
    const { diary, user: _user } = await http.post<
      Partial<Diary>,
      { diary: Diary; user: User }
    >("/diaries", {
      title: diaryTitle,
      type: diarytype,
      userId: user?.id,
    });
    if (diary && user) {
      dispatch(addDiary([diary] as Diary[]));
      dispatch(setUser(_user));
    }
    setDiaryTile("");
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Diary
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Diary Title</Form.Label>
            <Form.Control
              value={diaryTitle}
              onChange={(e: any) => setDiaryTile(e.target.value)}
              type="text"
              placeholder="Enter Diary Title"
            />
          </Form.Group>
          <Form.Check
            inline
            type="radio"
            onChange={(e: any) => setDiaryType(e.target.value)}
            value="private"
            id={`private`}
            label={`Private`}
          />
          <Form.Check
            inline
            type="radio"
            onChange={(e: any) => setDiaryType(e.target.value)}
            value="public"
            id={`public`}
            label={`Public`}
          />
          <Button onClick={saveDiary}>Save</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const DiaryMain = () => {
  const [modalShow, setModalShow] = useState(false);
  const diaries = useSelector((state: RootState) => state.diary);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(setAuthState(false));
  };
  return (
    <div className="ml-3 mt-5" style={{ width: "25vw" }}>
      <div className="d-flex align-items-center flex-column">
        <Button variant="danger" className="mb-3" onClick={logout}>
          Logout
        </Button>
        <Button size="sm" onClick={() => setModalShow(true)}>
          Create New
        </Button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {diaries?.map((diary: Diary, idx: number) => {
        return <DiaryComponent key={idx} diary={diary} />;
      })}
    </div>
  );
};

export default DiaryMain;
