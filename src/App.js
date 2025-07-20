import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import moment from "moment/moment";
import "moment/min/locales";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { fetchWeather } from "./features/weatherApi/weatherApiSlice";

moment.locale("ar");
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null;
function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    console.log(state);
    return state.weatherApi.isLoading;
  });

  const temp = useSelector((state) => {
    return state.weatherApi.weather;
  });
  const { t, i18n } = useTranslation();
  const [dataAndTime, setDateAndTime] = useState(null);
  // const [temp, setTemp] = useState({
  //   name: "",
  //   number: null,
  //   description: "",
  //   min: null,
  //   max: null,
  //   icon: null,
  // });
  const [locale, setLocale] = useState("ar");

  function handleChangeLanguage() {
    if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
    dispatch(fetchWeather());
    // axios
    //   .get(
    //     "https://api.openweathermap.org/data/2.5/weather?lat=34.88&lon=35.88&appid=f201e06b99b232f89a0de1ee0d6b4b2f",
    //     {
    //       cancelToken: new axios.CancelToken(function executor(c) {
    //         cancelAxios = c;
    //       }),
    //     }
    //   )
    //   .then(function (response) {
    //     // handle success
    //     let name = response.data.name;
    //     let number = Math.round(response.data.main.temp - 272.15);
    //     let description = response.data.weather[0].description;
    //     let min = Math.round(response.data.main.temp_min - 272.15);
    //     let max = Math.round(response.data.main.temp_max - 272.15);
    //     let responseIcon = response.data.weather[0].icon;
    //     setTemp({
    //       name,
    //       number,
    //       description,
    //       min,
    //       max,
    //       icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    //     });
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    // return () => {
    //   console.log("canceling");
    //   cancelAxios();
    // };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div
            style={{ height: "100vh", display: "flex", alignItems: "center" }}
          >
            {/* card */}
            <div
              dir={locale == "ar" ? "ltr" : "rtl"}
              style={{
                width: "100%",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* card-content */}
              <div
                // style={{
                //   width: "100%",
                //   background: "#cfe8fc",
                //   borderRadius: "10px",
                // }}
                className="weather-card"
              >
                {/* name + date */}
                <div
                  dir={locale == "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",

                    paddingRight: "20px",
                  }}
                >
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "3rem", width: "40%" }}
                    />
                  ) : (
                    ""
                  )}
                  <Typography
                    variant="h2"
                    component="h2"
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                    className="city"
                  >
                    {t(temp.name)}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      margin: "0 16px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {dataAndTime}
                  </Typography>
                </div>
                {/* ===name + date=== */}
                <hr />
                <div
                  dir={locale == "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}
                      <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "60px",
                        }}
                      >
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} alt="weather status" />
                    </div>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        textAlign: "start",
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                    >
                      {isLoading ? (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "2rem", width: "40%" }}
                        />
                      ) : (
                        ""
                      )}
                      {t(temp.description)}
                    </Typography>
                    <div style={{ display: "flex", textAlign: "start" }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontSize: "18px", color: "white" }}
                      >
                        {t("min")}:{temp.min}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ margin: "0px 5px" }}
                      >
                        |
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontSize: "18px", color: "white" }}
                      >
                        {t("max")}:{temp.max}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <CloudIcon
                      sx={{
                        fontSize: "100px",
                        color: "white",
                        margin: "20px 0",
                        animation: "floatCloud 4s ease-in-out infinite",
                      }}
                    ></CloudIcon>
                  </div>
                </div>
              </div>
              {/*=== card-content === */}
              <Button
                variant="text"
                onClick={handleChangeLanguage}
                className="lang-toggle"
              >
                {locale === "ar" ? "إنجليزي" : "Arabic"}
              </Button>
            </div>
            {/*=== card === */}
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
