import { ColorData } from "./types";

const apiURL = process.env.REACT_APP_API_URL;

const fetchFromApi = (...args: Parameters<typeof fetch>) => {
  const [url, ...rest] = args;
  return fetch(`${apiURL}${url}`, ...rest);
};

export const fetchColors = async () => {
  const data = await fetchFromApi("/colors");
  return data.json();
};

export const patchColor = async (
  originalColor: ColorData,
  updatedColor: string
) => {
  const res = await fetchFromApi(`/colors/${originalColor.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hexCode: updatedColor }),
  });

  return res.json();
};
