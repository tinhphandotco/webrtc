import styled from 'styled-components';
import { Select } from 'antd';
import Video from 'elements/Video';

const SettingsModal = styled.div`
  position: relative;
`;

SettingsModal.Devices = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

SettingsModal.Preview = styled.div`
  flex: 1 0 50%;
  overflow: hidden;
`;

SettingsModal.Video = styled(Video)`
  border-radius: 5px;
  width: 100%;
`;

SettingsModal.Selection = styled.div`
  flex: 1 0 45%;
  margin-left: 20px;
  overflow: hidden;
`;

SettingsModal.SelectRow = styled.div`
  margin-bottom: ${props => props.audiooutput ? '5px' : '15px'};
`;

SettingsModal.SelectLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

SettingsModal.Selector = styled(Select)`
  display: block;
  width: 100%;
`;

SettingsModal.Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  > button {
    margin: 0 5px;
  }
`;

SettingsModal.CheckMic = styled.div`
  margin: 10px 0;
`;

SettingsModal.TestSound = styled.div`
  color: #2684FF;
  cursor: pointer;
  user-select: none;
`;

export default SettingsModal;