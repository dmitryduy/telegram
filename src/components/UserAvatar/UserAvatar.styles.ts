import styled from 'styled-components';


export const UserAvatarContainer = styled.span<{color: string}>`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: #fff;
`;