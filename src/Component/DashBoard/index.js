import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API } from "../../gobalAPI/API";
import CardCreate from "../CardCreate";
import { UserContext } from "../../UseContext";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const [movie, setmovie] = useState([]);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    loadData();
  }, []);
  let loadData = async () => {
    if (userInfo?.id) {
      let movies = await axios.get(`${API}/movie`);

      setmovie(movies.data);
    } else {
      navigate("/");
    }
  };
  let deleteMovie = async (id) => {
    const { token } = userInfo;
    let movies = await axios.delete(`${API}/movie/${id}`, {
      headers: {
        token: token,
      },
    });
    loadData();
  };
  return (
    <>
      <Container minwidth="sm">
        <Box sx={{ flexGrow: 1, marginTop: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 12, md: 12 }}
          >
            {movie.map((data) => {
              return (
                <Grid
                  style={{ margin: "0 auto" }}
                  key={data._id}
                  item
                  xs={6}
                  sm={6}
                  md={4}
                >
                  <CardCreate
                    deleteMovie={deleteMovie}
                    data={data}
                    id={data._id}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default DashBoard;
