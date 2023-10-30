import { Box, Chip, SxProps } from '@mui/material';
import { optionFlowConfig } from '../config';
import { OptionFlowConfigProps } from '@/features/option-flow/types';

function hexToRgba(hex: string, transparency: number) {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const alpha = transparency / 100;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type ContractTagProps = {
  value: string;
  sx?: SxProps;
  onClick?: () => void;
};

export function ContractTag({ value, sx, onClick }: ContractTagProps) {
  const colorKey = value as keyof OptionFlowConfigProps['contractColor'];

  return (
    <Chip
      label={value === 'P' ? 'PUT' : 'CALL'}
      component="span"
      sx={{
        ...sx,
        bgcolor: hexToRgba(optionFlowConfig.contractColor[colorKey], 15),
        border: `1px solid ${optionFlowConfig.contractColor[colorKey]}`,
        fontWeight: 500,
        height: '24px',
        boxShadow: `0 0 6px 0px ${optionFlowConfig.contractColor[colorKey]};`,
      }}
      onClick={onClick}
    ></Chip>
  );
}

export function PremiumTag({
  value,
  contract,
}: {
  value: number;
  contract: string;
}) {
  return (
    <Box color={contract === 'P' ? '#F05265' : '#15BA68'} fontWeight="600">
      {'$' + value.toLocaleString(undefined)}
    </Box>
  );
}

export function SymbolTag(props: { value: string }) {
  return <Chip label={props.value} color="primary" {...props} size="small" />;
}

interface TagRowProps {
  values: Record<string, boolean>;
  Component: React.FC<ContractTagProps>;
  onChange: (values: Record<string, boolean>) => void;
}

export function TagRow({ values, Component, onChange }: TagRowProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {Object.keys(values).map((s) => (
        <Component
          value={s}
          sx={{
            cursor: 'pointer',
            opacity: values[s] ? 1 : 0.5,
            userSelect: 'none',
          }}
          onClick={() => {
            values[s] = !values[s];
            onChange(values);
          }}
          key={s}
        />
      ))}
    </Box>
  );
}

export function ExecutionTag({ value }: ContractTagProps) {
  const colorKey = value
    .toUpperCase()
    .replace(/\s/g, '_') as keyof OptionFlowConfigProps['executionColor'];

  return (
    <Chip
      label={value}
      component="span"
      sx={{
        bgcolor: hexToRgba(optionFlowConfig.executionColor[colorKey], 15),
        border: `1px solid ${optionFlowConfig.executionColor[colorKey]}`,
        fontWeight: 500,
        height: '24px',
        boxShadow: `0 0 6px 0px ${optionFlowConfig.executionColor[colorKey]};`,
      }}
    ></Chip>
  );
}
