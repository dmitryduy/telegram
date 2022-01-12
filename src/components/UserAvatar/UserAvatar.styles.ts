import styled from "styled-components";


export const UserAvatarImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

export const UserAvatarSpan = styled.span<{color: string}>`
  height: 50px;
  width: 50px;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: #fff;
`;