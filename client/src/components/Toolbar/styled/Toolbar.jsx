import styled, { css } from 'styled-components';
import { Icon } from 'antd';
import MyIcon from 'elements/MyIcon';
import { StyledControl } from '../atomics/Control';

const Toolbar = styled.div`
  background: rgba(0, 0, 0, .8);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 80px;
  left: 0;
  padding: 0 15px;
  position: absolute;
  right: 0;
  transition: transform .3s, background-color .3s;
  z-index: 10;

  ${props => props.hiding && css`
    background: transparent;
    transform: translateY(100%);

    ${Toolbar.Actions},
    ${StyledControl} {
      opacity: 0;
    }
  `}
`;

Toolbar.Actions = styled.div`
  align-items: stretch;
  display: flex;
  transition: opacity .3s;
`;

Toolbar.ActionItem = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
  outline: none;
  text-align: center;
  width: 95px;
`;

const IconMixin = css`
  font-size: 24px;
`;

Toolbar.ActionIcon = styled(Icon)`
  ${IconMixin}
`;

Toolbar.ActionMyIcon = styled(MyIcon)`
  ${IconMixin}
`;

Toolbar.ActionLabel = styled.span`
  display: block;
  font-size: 12px;
  margin-top: 10px;
`;

Toolbar.ChatAction = styled.span`
  display: inline-block;
  position: relative;
`;

Toolbar.ActionBadge = styled.span`
  background: #d90909;
  bottom: 100%;
  border-radius: 50%;
  color: #fff;
  display: block;
  font-size: 11px;
  height: 18px;
  left: 100%;
  line-height: 18px;
  min-width: 18px;
  max-width: 35px;
  overflow: hidden;
  padding: 0 3px;
  position: absolute;
  text-align: center;
  text-overflow: ellipsis;
  transform: translate(-25%, 25%);
  white-space: nowrap;
`;

Toolbar.Controls = styled.div`
  position: relative;
`;

Toolbar.TogglerWrapper = styled.div`
  background: transparent;
  bottom: 5px;
  border-radius: 50%;
  cursor: pointer;
  height: 100px;
  left: 50%;
  overflow: hidden;
  position: absolute;
  transform: translate(-50%, 0%);
  width: 100px;
`;

Toolbar.Toggler = styled.button`
  align-items: center;
  background: rgba(0,0,0,.8);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 25px;
  outline: none;
  width: 100%;
`;

export default Toolbar;