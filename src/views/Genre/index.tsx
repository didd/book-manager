import { useState } from "react";
import styled from "styled-components";
import { SecondaryButton } from "../../lib/components/buttons";
import { Genre } from "../../model/genres";

type Props = {
  genres: Genre[];
  selected: Genre | null;
  onClick: (genre: Genre) => void;
};

export function GenreList({ genres, selected, onClick }: Props) {
  const [activeId, setActiveId] = useState(selected ? selected.id : null);
  return (
    <Root>
      {genres.map((genre) => (
        <SecondaryButton
          key={genre.id}
          action={() => {
            setActiveId(genre.id);
            onClick(genre);
          }}
          active={activeId === genre.id}
          className="genreBox"
        >
          {genre.name}
        </SecondaryButton>
      ))}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 25px;
  row-gap: 25px;
  flex-wrap: wrap;
  .genreBox {
    padding: 20px;
  }
`;
