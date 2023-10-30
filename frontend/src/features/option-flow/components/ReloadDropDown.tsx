import { Refresh } from '@/assets/icons';
import { useFlowContext } from '../contexts/FlowContext';
import {
  IconButton,
  IconButtonProps as MuiIconButtonProps,
  styled,
} from '@mui/material';
import React from 'react';

interface IconButtonProps extends MuiIconButtonProps {
  isFetching?: boolean;
}

const IconButtonStyled = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isFetching',
})<IconButtonProps>(({ isFetching }) => ({
  '& svg': {
    animation: isFetching ? 'spin 1000ms linear infinite' : 'none',
    '@keyframes spin': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },
}));

export const ReloadDropDown = React.forwardRef(function reloadDropDown(
  props,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { state } = useFlowContext();

  return (
    <IconButtonStyled isFetching={state.isFetching} {...props} ref={ref}>
      <Refresh />
    </IconButtonStyled>
  );
});
