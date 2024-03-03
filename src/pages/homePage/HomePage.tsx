import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { theme } from "../../theme";

const HomePage = () => {
  const catTitle = "Dacia Logan";

  return (
    <div>
      <Box
        sx={{
          maxWidth: "768px",
          margin: "auto",
        }}
      >
        <Card
          sx={{
            height: "200px",
            display: "flex",
            backgroundColor: "yellow",
            padding: "20px",
            marginBottom: "20px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              height: "auto",
              padding: "0px",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                [theme.breakpoints.down("sm")]: {
                  height: "250px",
                  marginBottom: "10px",
                },
              }}
              image="https://cdn0.riastatic.com/photosnew/auto/photo/dacia_logan-mcv__535291690hd.webp"
              title="Dacia Logan 2008"
            />
          </Box>

          <CardContent
            sx={{
              flex: 2,
              padding: "0px 0px 0px 20px",

              [theme.breakpoints.down("sm")]: {
                padding: "0px 20px",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  marginTop="-5px"
                >
                  {/* Dacia Logan 2008 */}
                  {catTitle.length > 15
                    ? catTitle.slice(0, 15) + "..."
                    : catTitle}{" "}
                  2008
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-5px",
                }}
              >
                <QueryBuilderIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography
                  sx={{ marginLeft: "5px" }}
                  color="grey"
                  fontSize="14px"
                >
                  22.02.2024
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Typography
                variant="h5"
                color="green"
                fontWeight={700}
              >
                1500 $
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "110px" }}
              >
                <TimeToLeaveIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>Hatchback</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SpeedIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>
                  250 thds. km.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "110px" }}
              >
                <LocalGasStationIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>LPG/Petrol</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>Kharkov</Typography>
              </Box>
            </Box>

            <Box
              sx={{ marginTop: "5px", maxHeight: "82px", overflow: "hidden" }}
            >
              <Typography sx={{ lineHeight: 1.3 }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit ratione itaque quasi quibusdam nesciunt tempore
                voluptate soluta, cum, iusto, dolorum beatae non odit architecto
                rem similirque. Architecto totam reprehenderit cum. itaque quasi
                quibusdam nesciunt tempore voluptate soluta, cum, iusto, dolorum
                beatae non odit
                {/*  {desc.length > 250 ? desc.slice(0, 250) + "..." : desc} */}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            height: "200px",
            display: "flex",
            backgroundColor: "yellow",
            padding: "20px",
            marginBottom: "20px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              height: "auto",
              padding: "0px",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                [theme.breakpoints.down("sm")]: {
                  height: "250px",
                  marginBottom: "10px",
                },
              }}
              image="https://cdn0.riastatic.com/photosnew/auto/photo/dacia_logan-mcv__535291690hd.webp"
              title="Dacia Logan 2008"
            />
          </Box>

          <CardContent
            sx={{
              flex: 2,
              padding: "0px 0px 0px 20px",

              [theme.breakpoints.down("sm")]: {
                padding: "0px 20px",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  marginTop="-5px"
                >
                  {/* Dacia Logan 2008 */}
                  {catTitle.length > 15
                    ? catTitle.slice(0, 15) + "..."
                    : catTitle}{" "}
                  2008
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-5px",
                }}
              >
                <QueryBuilderIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography
                  sx={{ marginLeft: "5px" }}
                  color="grey"
                  fontSize="14px"
                >
                  22.02.2024
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Typography
                variant="h5"
                color="green"
                fontWeight={700}
              >
                1500 $
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "110px" }}
              >
                <TimeToLeaveIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>Hatchback</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SpeedIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>
                  250 thds. km.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "110px" }}
              >
                <LocalGasStationIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>LPG/Petrol</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>Kharkov</Typography>
              </Box>
            </Box>

            <Box
              sx={{ marginTop: "5px", maxHeight: "82px", overflow: "hidden" }}
            >
              <Typography sx={{ lineHeight: 1.3 }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit ratione itaque quasi quibusdam nesciunt tempore
                voluptate soluta, cum, iusto, dolorum beatae non odit architecto
                rem similirque. Architecto totam reprehenderit cum. itaque quasi
                quibusdam nesciunt tempore voluptate soluta, cum, iusto, dolorum
                beatae non odit
                {/*  {desc.length > 250 ? desc.slice(0, 250) + "..." : desc} */}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default HomePage;
