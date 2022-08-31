import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Archive = () => {
  const [archive, setArchive] = useState("");
  const url = "https://aircall-job.herokuapp.com/";
  let archiveItems = [];
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(url + "activities").then((response) => {
      setArchive(response.data);
    });
  };
  const unArchiveAllCalls = () => {
    console.log(archive);
    //archive all calls
    for (let i = 0; i < archive.length; i++) {
      axios
        .post(url + "activities/" + archive[i].id, { is_archived: false })
        .then((response) => {});
    }
    resetAllCalls();
  };

  const resetAllCalls = () => {
    axios.get(url + "reset").then((response) => {
      fetchData();
    });
  };

  if (archive) {
    archiveItems = archive.filter((items) => {
      return items.is_archived === true;
    });
  }

  const goToActivityDetail = (id) => {
     navigate("/activities/" + id);
  };

  return (
    <Card>
      <Card.Body>
        <Card className="card" onClick={unArchiveAllCalls}>
          <Card.Body>Unarchive all Calls</Card.Body>
        </Card>
        {Object.keys(archiveItems).map((actVal) => {
          return (
            <div
              key={archiveItems[actVal].id}
              id={archiveItems[actVal].id}
              onClick={() => goToActivityDetail(archiveItems[actVal].id)}
            >
              -------------------
              {new Date(archiveItems[actVal].created_at).toLocaleDateString()}
              ------------------
              <div className="card">
                <Row>
                  <Col>
                    <div className="col-12">
                      <div className="small-box bg-light">
                        <div className="inner">
                          <h3>{archiveItems[actVal].from}</h3>
                          <p> tried to call on {archiveItems[actVal].via}</p>
                        </div>
                        <div className="icon">
                          {archiveItems[actVal].call_type === "answered" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-telephone-inbound-fill display-icon"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-telephone-outbound-fill display-icon"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"
                              />
                            </svg>
                          )}
                        </div>
                        <a href="#" className="small-box-footer">
                          <span className="time">
                            {new Date(
                              archiveItems[actVal].created_at
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default Archive;
