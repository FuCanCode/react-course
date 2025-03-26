import styled, { css } from "styled-components";

const Row = styled.div<{ $layout?: "horizontal" | "vertical" }>`
  display: flex;

  ${(props) =>
    props.$layout === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `};

  ${(props) =>
    props.$layout === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `};
`;

Row.defaultProps = {
  $layout: "vertical",
};

export default Row;
