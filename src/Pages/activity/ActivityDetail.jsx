import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button} from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const ActivityDetail = () => {
  const params = useParams();
  const [activityDetail, setActivityDetail] = useState("");
  const url = "https://aircall-job.herokuapp.com/";

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchData();
  }, [navigate]);

//Fetc the data from API
  const fetchData = () => {
    let id = params.id;
    axios.get(url + "activities/" + id).then((response) => {
     

      setActivityDetail(response.data);
    });
  };

  // To redirect to activitis after Archive
  const goToActivityFeed = () => {
    navigate("/activities/");
  };

  //To update the archive status
  const archiveData = () => {
    axios
      .post(url + "activities/" + params.id, {
        is_archived: !activityDetail.is_archived,
      })
      .then((response) => {
        goToActivityFeed();
      });
  };

  return (
    <Card>
      <Card.Body>
        <Card className="card">
          <center>
            <Card.Img width="100px" variant="top" src="./../public/user.png" />
          </center>

          <Card.Body>
            <div className="col-12">
              <div className="small-box bg-light">
                <div className="inner">
                  <h4>{activityDetail.from}</h4>
                  <p> tried to call on {activityDetail.via}</p>
                </div>
                <div className="inner">
                  <h6>
                    {new Date(activityDetail.created_at).toLocaleDateString()}{" "}
                  </h6>
                  <h6>
                    {new Date(activityDetail.created_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </h6>
                </div>

                <a href="#" className="small-box-footer text-dark">
                  <span className="time">{activityDetail.call_type}</span>
                </a>
                <a href="#" className="small-box-footer text-dark">
                  <span className="time"> To: {activityDetail.to}</span>
                  <span className="time">
                     Duration: {activityDetail.duration} seconds
                  </span>
                </a>
                <a onClick={archiveData} className="small-box-footer text-dark">
                  <Button variant="primary" size="sm" onClick={archiveData}>
                    {activityDetail.is_archived ? "Unarchive" : "Archive"}
                  </Button>
                </a>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
};

export default ActivityDetail;
