import styled, { css, keyframes } from 'styled-components';
import MyIcon from 'elements/MyIcon';

const Circle = css`
  border-radius: 50%;
  left: 50%;
  position: absolute;
  height: 100%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const LoadingAnimation = keyframes`
   0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(.1);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const Loading = styled.div`
  height: 300px;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
`;

Loading.Icon = styled(MyIcon).attrs({
  type: 'iconvideo-chat',
})`
  color: #fff;
  font-size: 36px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

Loading.Circle1 = styled.div`
  ${Circle}

  animation: ${LoadingAnimation} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 0;
  border: 5px solid rgba(216, 216, 216, 0.2);
`;

Loading.Circle2 = styled.div`
  ${Circle}

  animation: ${LoadingAnimation} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 240ms;
  border: 20px solid #d8d8d8;
  opacity: 0;
`;

Loading.Circle3 = styled.div`
  ${Circle}

  animation: ${LoadingAnimation} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 400ms;
  border: 5px solid rgba(216, 216, 216, 0.2);
  opacity: 0;
`;

export default Loading;