import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components/macro";
import { ColorPicker } from "./ColorPicker";
import { ColorData } from "./types";
import useClickOutside from "./useClickOutside";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  margin: 1rem 0 1rem 1rem;
`;

const Input = styled.input`
  margin: 1rem 0 1rem 1rem;
`;

export type OnColorChange = (
  original: ColorData,
  updatedColor: Partial<Omit<ColorData, "id">>
) => void;

export type OnColorDelete = (color: ColorData) => void;

interface ListItemProps {
  color: ColorData;
  onColorChange: OnColorChange;
  onColorDelete: OnColorDelete;
}

const ListItem = ({ color, onColorChange, onColorDelete }: ListItemProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useClickOutside(input, () => {
    const inputValue = input.current?.value;
    if (inputValue && inputValue !== color.title) {
      onColorChange(color, { title: inputValue });
    }
    setIsEditMode(false);
  });

  return (
    <Li key={color.id}>
      <ColorPicker
        color={color}
        onChange={(updatedColor: string) => {
          onColorChange(color, { hexCode: updatedColor });
        }}
      />
      {isEditMode ? (
        <div>
          <Input ref={input} defaultValue={color.title} />
          <button onClick={() => onColorDelete(color)}>X</button>
        </div>
      ) : (
        <Name onClick={() => setIsEditMode(true)} tabIndex={1}>
          {color.title}
        </Name>
      )}
    </Li>
  );
};

interface Props {
  colorsList: ColorData[];
  onColorChange: OnColorChange;
  onColorDelete: OnColorDelete;
}

export const ColorsList = ({
  colorsList,
  onColorChange,
  onColorDelete,
}: Props) => {
  return (
    <Ul>
      {colorsList.map((color) => (
        <ListItem
          color={color}
          onColorChange={onColorChange}
          onColorDelete={onColorDelete}
          key={color.id}
        />
      ))}
    </Ul>
  );
};
