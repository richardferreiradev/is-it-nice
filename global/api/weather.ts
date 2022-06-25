import { REQUESTS } from "../constants";

export const getCurrentWeather = async (zipCode: string) => {
  try {
    const response = await fetch(
      `${REQUESTS.GET_CURRENT_WEATHER}&q=${zipCode}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
