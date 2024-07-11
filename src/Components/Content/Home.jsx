import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { AssignmentInd, CheckCircle } from "@mui/icons-material";
export const apiUrl = "https://66900b04c0a7969efd9abe4b.mockapi.io";
export const title = "student";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${apiUrl}/${title}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(true); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Grid container spacing={4} className="mt-10">
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        data.map((data, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            mt={"5em"}
            display={"flex"}
            justifyContent={"center"}
            className="hover:scale-[1.08] transition-transform duration-500 ease-in-out"
          >
            <Card
              sx={{ width: 345, height: 420 }}
              className="relative group hover:border-main hover:border-double hover:border-[0.2em]"
              key={index}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <CardMedia
                      component="img"
                      image={
                        data
                          ? data.image
                          : "https://static.thenounproject.com/png/504708-200.png"
                      }
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                className="text-center font-bold"
                title={`ID: ${data ? data.id : "Undefined"}`}
                subheader={`Class:${data ? data.class : "Undefined"}`}
              />
              {/* Background */}
              <CardMedia
                component="img"
                image={
                  data
                    ? data.image
                    : "https://static.thenounproject.com/png/504708-200.png"
                }
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              {/* Information */}
              <CardContent className="absolute bottom-14 bg-black bg-opacity-25 w-full max-h-[10em] transition-all visible z-[-1] duration-1000 translate-y-[100%] group-hover:z-[1] group-hover:translate-y-[-1%]">
                <Typography className="text-left flex flex-col flex-1">
                  <Typography variant="h8" color="white">
                    <b className="underline">NAME</b>:{" "}
                    {data ? data.name : "Noname"}
                  </Typography>
                  <Typography variant="h8" color="white">
                    <b className="underline">Feedback</b>:{" "}
                    {data ? data.feedback : "undifined"}
                  </Typography>
                  <Typography variant="h8" color="white">
                    <b className="underline">Gender: </b>
                    {data ? (data.gender ? "Male" : "Female") : "Unknown"}
                  </Typography>
                  <Typography variant="h8" color="white">
                    <b className="underline">Date of birth: </b>
                    {data ? data.dateofbirth : "undifined"}
                  </Typography>
                </Typography>
              </CardContent>
              {/* Action */}
              <CardActions
                disableSpacing
                className="absolute bottom-0 z-10 bg-white w-full flex justify-between"
              >
                <IconButton aria-label="add to favorites">
                  <AssignmentInd />
                </IconButton>

                <IconButton aria-label="share">
                  <CheckCircle />
                </IconButton>

                <Link to={`/Detail/${data?.id}`}>
                  <Button variant="contained" className="ml-10">
                    Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
