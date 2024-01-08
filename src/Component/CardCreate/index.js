import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UseContext";
export default function CardCreate({ data, id, deleteMovie }) {
  const styles = {
    color: data.rating >= 8.5 ? "green" : "red",
  };
  const navigate = useNavigate();
  const { userInfo } = React.useContext(UserContext);
  const [show, setshow] = React.useState(true);
  const [like, setlike] = React.useState(0);
  const [dislike, setdislike] = React.useState(0);
  let creater = data?.userName;
  let Username = creater.slice(0, 4);
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 3 }}>
      <CardActionArea>
        <div onClick={() => navigate(`MovieView/${data._id}`)}>
          <CardMedia
            component="img"
            height="600"
            sx={{ objectFit: "cover" }}
            image={data.poster}
            alt="green iguana"
          />
        </div>
        <CardContent sx={{ padding: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ display: "flex", justifyContent: "space-between" }}
            component="div"
          >
            <div>
              {data.name}
              <IconButton onClick={() => setshow(!show)}>
                {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </div>
            <div>
              <Typography variant="h6" sx={styles}>
                ⭐{data.rating}
              </Typography>
            </div>
          </Typography>
          {show ? (
            <Typography variant="body2" color="text.secondary">
              {data.summary}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <IconButton onClick={() => setlike(like + 1)}>
            <Badge badgeContent={like} color="primary">
              <ThumbUpIcon sx={{ color: "yellow" }} />
            </Badge>
          </IconButton>
          <IconButton onClick={() => setdislike(dislike + 1)}>
            <Badge badgeContent={dislike} color="error">
              <ThumbDownIcon sx={{ color: "yellow" }} />
            </Badge>
          </IconButton>
        </div>

        <div>
          {data?.userId === userInfo.id ? (
            <>
              <IconButton onClick={() => navigate(`MovieEdit/${data._id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: "red" }} onClick={() => deleteMovie(id)}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>{!Username ? "" : Username}</>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
