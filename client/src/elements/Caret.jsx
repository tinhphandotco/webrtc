import styled from 'styled-components';

const Caret = styled.div.attrs(props => ({
  direction: props.direction || 'down',
}))`
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: all .3s;

  ${props => props.direction === 'up' && `
    transform: translateY(25%) rotate(-135deg);
  `}

  ${props => props.direction === 'down' && `
    transform: translateY(-25%) rotate(45deg);
  `}

  ${props => props.direction === 'right' && `
    transform: translateY(-25%) rotate(-45deg);
  `}

  ${props => props.direction === 'left' && `
    transform: translateY(-25%) rotate(135deg);
  `}
`;

export default Caret;