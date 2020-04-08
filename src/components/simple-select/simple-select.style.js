import styled, { css } from 'styled-components';
import InputPresentationStyle from '../../__experimental__/components/input/input-presentation.style';
import StyledInput from '../../__experimental__/components/input/input.style';
import InputIconToggleStyle from '../../__experimental__/components/input-icon-toggle/input-icon-toggle.style';

const StyledSimpleSelect = styled.div`
  position: relative;

  ${({ transparent }) => transparent && css`
    ${InputPresentationStyle} {
      background: transparent;
      border: none;
    }

    ${StyledInput} {
      font-weight: 900;
      text-align: right;
    }

    ${InputIconToggleStyle} {
      width: auto;
    }
  `}
`;

export default StyledSimpleSelect;
