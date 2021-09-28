import React, { useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components/macro";
import useSWR from "swr";
import * as api from "./api";
import { ColorsList, OnColorChange } from "./ColorsList";
import { ColorData } from "./types";

const AddColorButton = styled.button`
  margin-top: 10px;
`;

function App() {
  const { data, error, mutate } = useSWR<ColorData[]>(
    "/colors",
    api.fetchColors
  );
  const [color, setColor] = useState("#FFF");

  const handleUpdateColor = useCallback<OnColorChange>(
    async (originalColor, updatedColor) => {
      try {
        await api.updateColor(originalColor, updatedColor);
        mutate();
        toast.success(`Color "${originalColor.title}" updated`);
      } catch (e) {
        toast.error(`We couldn't update the "${originalColor.title}" color`);
      }
    },
    [mutate]
  );

  const handleAddColor = useCallback(async () => {
    try {
      const title = `Color ${Date.now()}`;
      await api.createColor(title, color);
      mutate();
      toast.success(`New color created`);
    } catch (e) {
      toast.error(`We couldn't create the color`);
    }
  }, [color, mutate]);

  const handleDeleteColor = useCallback(
    async (color: ColorData) => {
      try {
        await api.deleteColor(color);
        mutate();
        toast.success(`Color "${color.title}" deleted`);
      } catch (e) {
        toast.error(`We couldn't delete the color`);
      }
    },
    [mutate]
  );

  if (error) {
    return <p>Sorry, we couldn't fetch the colors</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <main>
      <HexColorPicker color={color} onChange={setColor} />
      <AddColorButton onClick={handleAddColor}>Add color</AddColorButton>
      <ColorsList
        colorsList={data}
        onColorChange={handleUpdateColor}
        onColorDelete={handleDeleteColor}
      />
      <ToastContainer hideProgressBar autoClose={3000} />
    </main>
  );
}

export default App;
