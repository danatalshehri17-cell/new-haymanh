import styled from 'styled-components';

const PageLayout = styled.div`
  padding-top: 0;
  margin-top: -8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 0;
  }

  @media (max-width: 480px) {
    padding-top: 0;
  }
`;

export default PageLayout;

