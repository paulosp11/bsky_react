import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../RootReducer";
import { useAppDispatch } from "../../store";
import { Card, Col, Container, Row } from "react-bootstrap";
import http from "../../Service/api";
import { Entry } from "../../Interface/type";
import dayjs from "dayjs";
import { setEntries } from "../../Features/Entry/entrySlice";
import Markdown from "markdown-to-jsx";

const DiaryEntries = () => {
  const { id }: any = useParams();
  const { entry } = useSelector((state: RootState) => state);
  console.log(entry);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entry/${id}`)
        .then(({ entries: _entry }) => {
          console.log(_entry);
          if (_entry) {
            const sortByLastUpdate = _entry.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdate));
          }
        });
    }
  }, [id, dispatch]);
  return (
    <div className="mt-5">
      <div>
        <Link className="ml-3" to="/">
          Add More Entries
        </Link>
        {entry.map((entry) => {
          return (
            <Container key={entry.id}>
              <Row>
                <Col xs={12} sm={6} md={4}>
                  <Card className="mt-2">
                    <Card.Body>
                      <Card.Title>{entry.title}</Card.Title>
                      <Card.Text>
                        <Markdown>{entry.content.substring(0, 20)}</Markdown>
                      </Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">
                        Created At: {entry.createdAt}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        Updated At: {entry.updatedAt}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default DiaryEntries;
