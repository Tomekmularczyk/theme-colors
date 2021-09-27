import React from "react";
import { ColorData } from "./types";
import { ColorPicker, OnColorChange } from "./ColorPicker";
import styled from "styled-components/macro";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  margin-left: 1rem;
`;

interface Props {
  colorsList: ColorData[];
  onColorChange: OnColorChange;
}

export const ColorsList = ({ colorsList, onColorChange }: Props) => {
  return (
    <List>
      {colorsList.map((color) => (
        <ListItem key={color.id}>
          <ColorPicker color={color} onChange={onColorChange} />
          <Name>{color.title}</Name>
        </ListItem>
      ))}
    </List>
  );
};

export type { OnColorChange };
