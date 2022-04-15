import styled from 'styled-components';

export const Block = styled.div`
  display: inline-block;
  border: 1px solid rgb(229, 232, 235);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  cursor: pointer;
  width: 350px;
  margin: 0 20px;
`;

export const ImageBlock = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  & img {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    object-fit: cover;
    transition: opacity 400ms ease 0s;
    width: 100%;
    height: 200px;
  }
`;

export const ContentBlock = styled.div`
  position: relative;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > strong {
    font-size: 20px;
  }

  & > span {
    margin-top: 10px;
    font-size: 12px;
    color: #c0c0c0;
  }
`;

export const LogoBlock = styled.div`
  position: absolute;
  top: -30px;
  height: 50px;
  width: 50px;

  & span {
    display: none;
  }
`;
