import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../gobalAPI/API";

function MovieView() {
  const navigate = useNavigate();
  const param = useParams();
  const [Movie, setMovie] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const movies = await axios.get(`${API}/movie/${param.id}`);
    setMovie(movies.data);
  };
  return (
    <>
      <Card sx={{ maxWidth: 700, padding: 2, margin: "1% auto" }}>
        <Typography textAlign={"center"} variant="h5">
          {Movie.name}
        </Typography>
        <iframe
          width="100%"
          height="500px"
          src={Movie.trailer}
          title={Movie.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/Portal")}
        >
          Back
        </Button>
      </Card>
    </>
  );
}

export default MovieView;
