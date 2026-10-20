import { openErrorNotification } from "@/utils/notification";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const city = "dhaka";
const fetchWeatherData = () => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=085acfc784839ef19e04af29b755be3e&units=metric`
  );
};

export default function useWeather() {
  return useQuery(["fetch-weather-data"], fetchWeatherData, {
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          openErrorNotification({ description: "Network Error!" });
        }
      } else if (error.request) {
        openErrorNotification({ description: "Cannot connect to the server" });
      } else {
        openErrorNotification({ description: "Error" });
      }
    },
  });
}
