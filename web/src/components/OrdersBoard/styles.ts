import styled from 'styled-components';

export const Board = styled.div`
  flex: 1;
  padding: 16px;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 16px;

  > header {
    padding: 8px;
    font-size: 14px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;

  button {
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 8px;
    height: 128px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 24px;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 14px;
      color: #666;
    }
  }
`;
