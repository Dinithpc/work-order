import type { PaletteOptions } from '@mui/material';
import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, info, neutral, success, warning } from '../colors';
import type { ColorPreset, Contrast } from '../index';
import { getPrimary } from '../utils';

interface Config {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
}

export const createPalette = (config: Config): PaletteOptions => {
  const { colorPreset, contrast } = config;

  return {
    action: {
      active: neutral[400],
      disabled: alpha(neutral[400], 0.38),
      disabledBackground: alpha(neutral[400], 0.12),
      focus: alpha(neutral[400], 0.16),
      hover: alpha(neutral[400], 0.04),
      selected: alpha(neutral[400], 0.12)
    },
    background: {
      default: contrast === 'high' ? '#0A0F18' : '#0C121D',
      paper: '#101826'
    },
    divider: neutral[800],
    error,
    info,
    mode: 'dark',
    neutral,
    primary: getPrimary(colorPreset),
    success,
    text: {
      primary: common.white,
      secondary: '#97A1BA',
      disabled: alpha(common.white, 0.38)
    },
    warning
  };
};
