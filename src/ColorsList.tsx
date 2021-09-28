import React, { useRef, useState } from "react";
import { ColorData } from "./types";
import { ColorPicker, OnColorChange } from "./ColorPicker";
import styled from "styled-components/macro";
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

interface ListItemProps {
  color: ColorData;
  onColorChange: OnColorChange;
}

const ListItem = ({ color, onColorChange }: ListItemProps) => {
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
      <ColorPicker color={color} onChange={onColorChange} />
      {isEditMode ? (
        <Input ref={input} defaultValue={color.title} />
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
}

export const ColorsList = ({ colorsList, onColorChange }: Props) => {
  return (
    <Ul>
      {colorsList.map((color) => (
        <ListItem color={color} onColorChange={onColorChange} key={color.id} />
      ))}
    </Ul>
  );
};

export type { OnColorChange };
