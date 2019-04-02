import styled, { css } from 'styled-components';
import Video from 'elements/Video';

const ParticipantItem = styled.div`
  border-radius: 10px;
  height: 100%;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 1;

  ${props => (props.showInfo || props.selected) && css`
    ${ParticipantItem.Devices} {
      visibility: visible;
    }

    ${ParticipantItem.UserInfo} {
      display: flex;
    }
  `}
`;

ParticipantItem.Video = styled(Video)`
  background: #333;
  height: 100%;
  width: 100%;
`;

ParticipantItem.VideoInactive = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

ParticipantItem.VideoInactiveAvatar = styled.img`
  border-radius: 50%;
  height: 70px;
  object-fit: cover;
  width: 70px;
`;

ParticipantItem.UserInfo = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  display: none;
  justify-content: center;
  left: 0;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

ParticipantItem.Username = styled.span`
  color: #fff;
`;

ParticipantItem.Actions = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 3px 10px;
  position: absolute;
  width: 100%;
  z-index: 20;
`;

ParticipantItem.Devices = styled.div`
  color: #fff;
  visibility: hidden;
`;

ParticipantItem.DeviceItem = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  margin: 0 3px;
  outline: none;
  padding: 0 3px;
`;

export default ParticipantItem;