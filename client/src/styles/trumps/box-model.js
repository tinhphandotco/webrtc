import { css } from 'styled-components';

export const margin = css`
  ${props => props.mg && css`margin: ${(props.mgb || 1) * 5}px;` }
  ${props => props.mgt && css`margin: ${(props.mgb || 1) * 5}px;` }
  ${props => props.mgb && css`margin: ${(props.mgb || 1) * 5}px;` }
  ${props => props.mgl && css`margin: ${(props.mgl || 1) * 5}px;` }
  ${props => props.mgr && css`margin: ${(props.mgr || 1) * 5}px;` }
  ${props => props.mgx && css`margin: ${(props.mgx || 1) * 5}px;` }
  ${props => props.mgy && css`margin: ${(props.mgy || 1) * 5}px;` }
`;