import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, ListItemIcon, ListItemText, MenuItem, Popover } from '@mui/material';
import { usePopover } from '../../hooks/use-popover';

type Language = 'de' | 'en' | 'es';

interface LanguageOption {
  icon: string;
  label: string;
  value: Language;
}

const languageOptions: LanguageOption[] = [
  {
    icon: '/assets/flags/flag-uk.svg',
    label: 'English',
    value: 'en'
  },
  {
    icon: '/assets/flags/flag-de.svg',
    label: 'German',
    value: 'de'
  },
  {
    icon: '/assets/flags/flag-es.svg',
    label: 'Spanish',
    value: 'es'
  }
];

interface LanguagePopoverProps {
  language?: Language;
  onLanguageChange?: (value: Language) => void;
}

export const LanguagePopover: FC<LanguagePopoverProps> = (props) => {
  const { language = 'en', onLanguageChange, ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const popover = usePopover<HTMLButtonElement>();

  const handleLanguageChange = useCallback(
    (value: 'en' | 'de' | 'es'): void => {
      popover.handleClose();
      onLanguageChange?.(value);
    },
    [popover, onLanguageChange]
  );

  const selectedOption = languageOptions.find((option) => option.value === language);

  return (
    <>
      <IconButton
        onClick={popover.handleOpen}
        ref={anchorRef}
        {...other}
      >
        <Box
          sx={{
            display: 'flex',
            height: 20,
            width: 20,
            '& img': {
              width: '100%'
            }
          }}
        >
          {selectedOption && (
            <img
              alt={selectedOption.label}
              src={selectedOption.icon}
            />
          )}
        </Box>
      </IconButton>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        disableScrollLock
        onClose={popover.handleClose}
        open={popover.open}
        PaperProps={{ sx: { width: 240 } }}
      >
        {languageOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
          >
            <ListItemIcon>
              <Box
                sx={{
                  display: 'flex',
                  height: 20,
                  width: 20,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                <img
                  alt={option.label}
                  src={option.icon}
                />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={option.label}
              primaryTypographyProps={{ variant: 'subtitle2' }}
            />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

LanguagePopover.propTypes = {
  language: PropTypes.oneOf<Language>(['de', 'en', 'es']),
  onLanguageChange: PropTypes.func
};
