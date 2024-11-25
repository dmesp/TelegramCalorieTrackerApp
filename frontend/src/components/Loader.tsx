import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 -18px 0 0 lightgreen, 12.727926px -12.727926px 0 0 lightgreen, 18px 0 0 0 lightgreen, 
                12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0), 
                -12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), 
                -18px 0 0 0 rgba(152, 128, 255, 0), 
                -12.727926px -12.727926px 0 0 rgba(152, 128, 255, 0);
  }
  12.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 0 lightgreen, 
                18px 0 0 0 lightgreen, 12.727926px 12.727926px 0 0 lightgreen, 
                0 18px 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                -18px 0 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
  }
  25% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 
                12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 
                18px 0 0 0 lightgreen, 12.727926px 12.727926px 0 0 lightgreen, 
                0 18px 0 0 lightgreen, 
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                -18px 0 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
  }
  37.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 
                12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 
                18px 0 0 -5px rgba(152, 128, 255, 0), 
                12.727926px 12.727926px 0 0 lightgreen, 
                0 18px 0 0 lightgreen, 
                -12.727926px 12.727926px 0 0 lightgreen, 
                -18px 0 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
  }
  50% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 
                12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 
                18px 0 0 -5px rgba(152, 128, 255, 0), 
                12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                0 18px 0 0 lightgreen, 
                -12.727926px 12.727926px 0 0 lightgreen, 
                -18px 0 0 0 lightgreen, 
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
  }
  62.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 
                12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 
                18px 0 0 -5px rgba(152, 128, 255, 0), 
                12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                0 18px 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px 12.727926px 0 0 lightgreen, 
                -18px 0 0 0 lightgreen, 
                -12.727926px -12.727926px 0 0 lightgreen;
  }
  75% {
    box-shadow: 0 -18px 0 0 lightgreen, 
                12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 
                18px 0 0 -5px rgba(152, 128, 255, 0), 
                12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                0 18px 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                -18px 0 0 0 lightgreen, 
                -12.727926px -12.727926px 0 0 lightgreen;
  }
  87.5% {
    box-shadow: 0 -18px 0 0 lightgreen, 
                12.727926px -12.727926px 0 0 lightgreen, 
                18px 0 0 -5px rgba(152, 128, 255, 0), 
                12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                0 18px 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 
                -18px 0 0 -5px rgba(152, 128, 255, 0), 
                -12.727926px -12.727926px 0 0 lightgreen;
  }
`;

const DotSpin = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: transparent;
  color: transparent;
  animation: ${spinAnimation} 1.5s infinite linear;
`;

const CenteredLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;

const Loader = () => {
  return (
    <CenteredLoader>
      <DotSpin />
    </CenteredLoader>
  );
};

export default Loader;