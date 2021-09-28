import React, { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components/macro";
import { ColorData } from "./types";
import useClickOutside from "./useClickOutside";

const Container = styled.div`
  position: relative;
`;

const Swatch = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 3px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  border-radius: 9px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
`;

interface Props {
  color: ColorData;
  onChange: (updatedColor: string) => void;
}

export const ColorPicker = ({ color, onChange }: Props) => {
  const popover = useRef<HTMLDivElement>(null);
  const [updatedColor, setUpdatedColor] = useState(color.hexCode);
  const [isOpen, toggle] = useState(false);

  useClickOutside(popover, () => {
    toggle(false);
    onChange(updatedColor);
  });

  return (
    <Container>
      <Swatch
        style={{ backgroundColor: updatedColor }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <Popover ref={popover}>
          <HexColorPicker color={updatedColor} onChange={setUpdatedColor} />
        </Popover>
      )}
    </Container>
  );
};
