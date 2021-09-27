import React, { useCallback, useState } from "react";
import useSWR from "swr";
import { HexColorPicker } from "react-colorful";
import { ColorData } from "./types";
import { ColorsList, OnColorChange } from "./ColorsList";
import * as api from "./api";

const useUserColors = () => {
  return useSWR<ColorData[]>("/colors", api.fetchColors);
};

function App() {
  const { data } = useUserColors();
  const [color, setColor] = useState("#aabbcc");

  const handleUpdateColor = useCallback<OnColorChange>(
    async (originalColor, updatedColor) => {
      await api.patchColor(originalColor, updatedColor);
    },
    []
  );

  if (!data) {
    return null;
  }

  return (
    <main>
      <HexColorPicker color={color} onChange={setColor} />
      <ColorsList colorsList={data} onColorChange={handleUpdateColor} />
    </main>
  );
}

export default App;
