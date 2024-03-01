import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import s from "./homePage.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const HomePage = () => {
  const catTitle = "Dacia Logan";

  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
        }}
        className={s.container}
      >
        <Card
          sx={{
            maxWidth: "768px",
            height: "200px",
            display: "flex",
            justifyContent: "spaceBetween",
            padding: "20px",
            marginBottom: "20px",
          }}
          className={s.card}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              image="https://cdn0.riastatic.com/photosnew/auto/photo/dacia_logan-mcv__535291690hd.webp"
              title="Dacia Logan 2008"
              className={s.cardMedia}
            />
          </Box>

          <CardContent
            sx={{ flex: 2, padding: "0px 0px 0px 20px" }}
            className={s.cardContent}
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
            maxWidth: "768px",
            height: "200px",
            display: "flex",
            justifyContent: "spaceBetween",
            padding: "20px",
            marginBottom: "20px",
          }}
          className={s.card}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              image="https://cdn0.riastatic.com/photosnew/auto/photo/dacia_logan-mcv__535291690hd.webp"
              title="Dacia Logan 2008"
              className={s.cardMedia}
            />
          </Box>

          <CardContent
            sx={{ flex: 2, padding: "0px 0px 0px 20px" }}
            className={s.cardContent}
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
      </Container>
    </div>
  );
};

export default HomePage;
