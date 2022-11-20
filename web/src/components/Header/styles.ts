import styled from 'styled-components';

export const Container = styled.header`
  background: #D73035;
  display: flex;
  justify-content: center;
  height: 198px;
  `;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-details {
    color: #fff;

    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
