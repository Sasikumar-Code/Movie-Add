import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../gobalAPI/API";
import { UserContext } from "../../UseContext";

function MovieEdit() {
  const param = useParams();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const formikValidation = yup.object({
    name: yup.string().required("Movie Name Must Filled"),
    rating: yup.string().min(1, "Rating Must Be Minimum Greater then 0"),
    poster: yup.string().required("Poster Must be Given"),
    summary: yup
      .string()
      .min(7, "Summary Must be Greater the 7")
      .required("pleace fill the Summary"),
    trailer: yup.string().required("please Give the trailer"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      rating: "",
      poster: "",
      summary: "",
      trailer: "",
    },
    validationSchema: formikValidation,
    onSubmit: async (values) => {
      const data = { ...values };
      data["token"] = userInfo?.token;

      const Movies = await axios.put(`${API}/movie/${param.id}`, data);
      navigate("/Portal");
    },
  });
  useEffect(() => {
    LoadData();
  }, []);
  const LoadData = async () => {
    try {
      const Movies = await axios.get(`${API}/movie/${param.id}`);
      formik.setValues({
        name: Movies.data.name,
        poster: Movies.data.poster,
        rating: Movies.data.rating,
        summary: Movies.data.summary,
        trailer: Movies.data.trailer,
      });
    } catch (error) {
      console.log("Somthing Want Worring");
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          maxWidth: 500,
          margin: "2% auto",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" textAlign={"center"} marginBottom={4}>
          Movie_Edit
        </Typography>
        <form>
          <TextField
            id="outlined-basic"
            label="Movie_Name"
            name="name"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "30px" }}
            fullWidth
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
          <TextField
            id="outlined-basic"
            label="Rating"
            name="rating"
            onChange={formik.handleChange}
            value={formik.values.rating}
            onBlur={formik.handleBlur}
            variant="outlined"
            sx={{ marginBottom: "30px" }}
            fullWidth
            error={formik.touched.rating && formik.errors.rating}
            helperText={
              formik.touched.rating && formik.errors.rating
                ? formik.errors.rating
                : null
            }
          />
          <TextField
            id="outlined-basic"
            label="Poster"
            name="poster"
            onChange={formik.handleChange}
            value={formik.values.poster}
            onBlur={formik.handleBlur}
            variant="outlined"
            sx={{ marginBottom: "30px" }}
            fullWidth
            error={formik.touched.poster && formik.errors.poster}
            helperText={
              formik.touched.poster && formik.errors.poster
                ? formik.errors.poster
                : null
            }
          />
          <TextField
            id="outlined-basic"
            label="Summary"
            name="summary"
            onChange={formik.handleChange}
            value={formik.values.summary}
            onBlur={formik.handleBlur}
            variant="outlined"
            sx={{ marginBottom: "30px" }}
            fullWidth
            error={formik.touched.summary && formik.errors.summary}
            helperText={
              formik.touched.summary && formik.errors.summary
                ? formik.errors.summary
                : null
            }
          />
          <TextField
            id="outlined-basic"
            label="Trailer"
            name="trailer"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.trailer}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "30px" }}
            fullWidth
            error={formik.touched.trailer && formik.errors.trailer}
            helperText={
              formik.touched.trailer && formik.errors.trailer
                ? formik.errors.trailer
                : null
            }
          />

          <Button
            variant="contained"
            sx={{ marginBottom: "20px" }}
            fullWidth
            disabled={!formik.isValid}
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/Portal")}
          >
            Back
          </Button>
        </form>
      </Box>
    </>
  );
}

export default MovieEdit;
