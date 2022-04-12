import { useState } from "react";
import styled from "styled-components";
import { SecondaryButton } from "../../lib/components/buttons";
import { SubGenre } from "../../model/genres";

type Props = {
  subgenres: SubGenre[];
  selected: SubGenre | null | "addNew";
  onClick: (genre: SubGenre | "addNew") => void;
};

export function SubGenreList({ subgenres, selected, onClick }: Props) {
  const [activeId, setActiveId] = useState<number | null | "addNew">(
    selected ? (typeof selected === "string" ? selected : selected.id) : null
  );
  return (
    <Root>
      {subgenres.map((subgenre) => (
        <SecondaryButton
          key={subgenre.id}
          action={() => {
            setActiveId(subgenre.id);
            onClick(subgenre);
          }}
          active={activeId === subgenre.id}
          className="subGenreBox"
        >
          {subgenre.name}
        </SecondaryButton>
      ))}
      <SecondaryButton
        action={() => {
          setActiveId("addNew");
          onClick("addNew");
        }}
        active={activeId === "addNew"}
        className="subGenreBox"
      >
        Add new
      </SecondaryButton>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 25px;
  row-gap: 25px;
  flex-wrap: wrap;
  .subGenreBox {
    padding: 20px;
    flex: 1;
  }
`;
