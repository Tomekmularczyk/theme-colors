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

export const updateColor = async (
  originalColor: ColorData,
  updatedColor: Partial<Omit<ColorData, "id">>
) => {
  const data = await fetchFromApi(`/colors/${originalColor.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedColor),
  });
  return data.json();
};

export const createColor = async (title: string, hexCode: string) => {
  const data = await fetchFromApi("/colors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hexCode, title }),
  });
  return data.json();
};

export const deleteColor = async (color: ColorData) => {
  const data = await fetchFromApi(`/colors/${color.id}`, {
    method: "DELETE",
  });
  return data.json();
};
