import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: var(--base-font-size, 16px);
    scroll-behavior: smooth;

    @media (max-width: 1024px) {
      font-size: 15.5px;
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14.5px;
    }
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    direction: rtl;
    transition: font-size 0.3s ease;
  }

  main {
    padding-top: 90px;
    min-height: 60vh;

    @media (max-width: 1024px) {
      padding-top: 82px;
    }

    @media (max-width: 768px) {
      padding-top: 74px;
    }

    @media (max-width: 480px) {
      padding-top: 68px;
    }
  }

  * {
    animation-duration: var(--animation-duration, 0.3s);
    transition-duration: var(--transition-duration, 0.3s);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.display};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: ${({ theme }) => `calc(${theme.fontSizes.display} * 0.76)`};
    }

    @media (max-width: 480px) {
      font-size: ${({ theme }) => `calc(${theme.fontSizes.display} * 0.68)`};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: ${({ theme }) => `calc(${theme.fontSizes.xxxl} * 0.78)`};
    }

    @media (max-width: 480px) {
      font-size: ${({ theme }) => `calc(${theme.fontSizes.xxxl} * 0.7)`};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: ${({ theme }) => `calc(${theme.fontSizes.xxl} * 0.8)`};
    }

    @media (max-width: 480px) {
      font-size: ${({ theme }) => `calc(${theme.fontSizes.xxl} * 0.72)`};
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textLight};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.primary};
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    width: 100%;
  }

  .section {
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .d-flex {
    display: flex;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .w-100 {
    width: 100%;
  }

  .h-100 {
    height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .container {
      padding: 0 ${({ theme }) => theme.spacing.sm};
    }
    
    .section {
      padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    .d-flex {
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.md};
    }
  }
`;

export default GlobalStyle;
