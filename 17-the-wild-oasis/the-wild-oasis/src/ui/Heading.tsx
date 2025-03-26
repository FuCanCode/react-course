import styled, { css } from "styled-components";

const sizeMap = new Map([
  [
    "h1",
    css`
      font-size: 3rem;
      font-weight: 600;
    `,
  ],
  [
    "h2",
    css`
      font-size: 2rem;
      font-weight: 600;
    `,
  ],
  [
    "h3",
    css`
      font-size: 2rem;
      font-weight: 500;
    `,
  ],
]);

const Heading = styled.h1<{ as: "h1" | "h2" | "h3" }>`
  ${(props) => sizeMap.get(props.as) || sizeMap.get("h1")}

  line-height: 1.4;
`;

export default Heading;
