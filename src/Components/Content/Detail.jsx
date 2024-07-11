import React from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";
import moment from "moment";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { AspectRatio, CardActions, CardOverflow, Sheet } from "@mui/joy";
import { info } from "autoprefixer";
import { apiUrl, title } from "./Home";

function Detail() {
  // get ID
  const { id } = useParams();
  const ID = parseInt(id);
  // React State
  const [infor, setInfor] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (ID) {
      setLoading(true);
      fetch(`${apiUrl}/${title}/${ID}`)
        .then((res) => res.json())
        .then((data) => {
          setInfor(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [ID]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <Stack className="w-[50em] h-[25em] absolute top-[4.5em] left-[0]">
      {infor ? (
        <React.Fragment>
          {/* BackGround */}
          <Stack className="absolute z-10 top-[13em] left-[6em]">
            <Box
              sx={{
                perspective: "1000px",
                transition: "transform 0.4s",
                "& > div, & > div > div": {
                  transition: "inherit",
                },
                "&:hover": {
                  "& > div": {
                    transform: "rotateY(30deg)",
                    "& > div:nth-child(2)": {
                      transform: "scaleY(0.9) translate3d(20px, 30px, 40px)",
                    },
                    "& > div:nth-child(3)": {
                      transform: "translate3d(45px, 50px, 40px)",
                    },
                  },
                },
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  minHeight: "400px",
                  width: 300,
                  backgroundColor: "#9A5B12",
                  borderColor: "#000",
                }}
              >
                <Typography level="h2" fontSize="lg" textColor="#000">
                  Card
                </Typography>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    border: "1px solid",
                    borderColor: "#777",
                    backdropFilter: "blur(1px)",
                    backgroundImage: `url(${infor ? infor.image : ""})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "Cover",
                  }}
                ></CardCover>
                <CardContent
                  sx={{
                    alignItems: "self-end",
                    justifyContent: "flex-end",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
                    border: "1px solid",
                    borderColor: "#000",
                    backdropFilter: "blur(1px)",
                  }}
                >
                  <Typography level="h2" fontSize="lg" textColor="#fff" m={2}>
                    {infor ? infor.name : "Undifined"} -{" "}
                    {infor ? infor.id : "Undifined"}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Stack>
          {/* Image Card */}
          <Box position={"absolute"} top={0} width={"100%"}>
            <Card
              data-resizable
              sx={{
                textAlign: "center",
                alignItems: "center",
                width: 1440,
                height: 750,
                overflow: "auto",
                resize: "horizontal",
                "--icon-size": "100px",
              }}
            >
              <CardOverflow variant="solid" color="warning">
                <AspectRatio
                  variant="outlined"
                  color="warning"
                  ratio="1"
                  sx={{
                    m: "auto",
                    transform: "translateY(50%)",
                    borderRadius: "50%",
                    width: "var(--icon-size)",
                    boxShadow: "sm",
                    bgcolor: "background.surface",
                    position: "relative",
                    backgroundImage: `url(${infor.image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "Cover",
                  }}
                ></AspectRatio>
              </CardOverflow>
              <Typography
                level="title-lg"
                sx={{ mt: "calc(var(--icon-size) / 2)" }}
              >
                {infor.name}
              </Typography>
              <CardContent sx={{ maxWidth: "40ch" }}></CardContent>
              <CardActions
                orientation="vertical"
                buttonFlex={1}
                sx={{
                  "--Button-radius": "40px",
                  width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
                }}
              ></CardActions>
            </Card>
          </Box>
          {/* Infor Card */}
          <Stack className="absolute w-full h-full left-[30em] top-[18em]">
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: { xs: "auto", sm: "initial" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "block",
                  width: "1px",
                  bgcolor: "warning.300",
                  left: "500px",
                  top: "-24px",
                  bottom: "-24px",
                  "&::before": {
                    top: "4px",
                    display: "block",
                    position: "absolute",
                    right: "0.5rem",
                    color: "text.tertiary",
                    fontSize: "sm",
                    fontWeight: "lg",
                  },
                  "&::after": {
                    top: "4px",
                    display: "block",
                    position: "absolute",
                    left: "0.5rem",
                    color: "text.tertiary",
                    fontSize: "sm",
                    fontWeight: "lg",
                  },
                }}
              />
              <Card
                orientation="horizontal"
                sx={{
                  width: "100%",
                  flexWrap: "wrap",
                  [`& > *`]: {
                    "--stack-point": "500px",
                    minWidth:
                      "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                  },
                  // make the card resizable for demo
                  overflow: "auto",
                  resize: "horizontal",
                }}
              >
                <AspectRatio
                  flex
                  ratio="1"
                  maxHeight={182}
                  sx={{ minWidth: 182 }}
                >
                  <img src={infor.image} />
                </AspectRatio>
                <CardContent>
                  <Typography fontSize="xl" fontWeight="lg">
                    {infor.name}
                  </Typography>
                  <Typography
                    level="body-sm"
                    fontWeight="lg"
                    textColor="text.tertiary"
                  >
                    {infor.class}
                  </Typography>
                  <Sheet
                    sx={{
                      bgcolor: "background.level1",
                      borderRadius: "sm",
                      p: 1.5,
                      my: 1.5,
                      display: "flex",
                      gap: 2,
                      "& > div": { flex: 1 },
                    }}
                  >
                    <div>
                      <Typography level="body-xs" fontWeight="lg">
                        Date of birth
                      </Typography>
                      <Typography fontWeight="lg">
                        {infor ? infor.dateofbirth : "None"}
                      </Typography>
                    </div>
                    <div>
                      <Typography level="body-xs" fontWeight="lg">
                        CreateAt
                      </Typography>
                      <Typography fontWeight="lg">
                        {moment(infor ? info.createdAt : "").format(
                          "YYYY-MM-DD"
                        )}
                      </Typography>
                    </div>
                    <div>
                      <Typography level="body-xs" fontWeight="lg">
                        Feedback
                      </Typography>
                      <Typography fontWeight="lg">
                        {infor ? infor.feedback : ""}
                      </Typography>
                    </div>
                  </Sheet>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      "& > button": { flex: 1 },
                    }}
                  ></Box>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </React.Fragment>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      )}
    </Stack>
  );
}

export default Detail;
