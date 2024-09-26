import type { FC, FormEvent, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BuildingOfficeIcon from '@heroicons/react/24/outline/BuildingOfficeIcon';
import CloudIcon from '@heroicons/react/24/outline/CloudIcon';
import CpuChipIcon from '@heroicons/react/24/outline/CpuChipIcon';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

interface Option {
  description: string;
  icon: ReactNode;
  label: string;
  value: string;
}

const options: Option[] = [
  {
    description: 'Software as a service (SaaS) is a software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted.',
    icon: (
      <SvgIcon fontSize="small">
        <CpuChipIcon />
      </SvgIcon>
    ),
    label: 'Software as a service',
    value: 'saas'
  },
  {
    description: 'Infrastructure as a service (IaaS) is a form of cloud computing that provides virtualized computing resources over the internet.',
    icon: (
      <SvgIcon fontSize="small">
        <CloudIcon />
      </SvgIcon>
    ),
    label: 'Infrastructure as a Service',
    value: 'iaas'
  },
  {
    description: 'Platform as a service (PaaS) is a deployment environment in the cloud, with resources that enable you to deliver cloud-based apps or even enterprise apps.',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOfficeIcon />
      </SvgIcon>
    ),
    label: 'Platform as a service',
    value: 'paas'
  }
];

interface Values {
  businessType?: string;
}

interface WizardBusinessStepProps {
  onNextStep?: (values: Values) => void;
  values: Values;
}

export const WizardBusinessStep: FC<WizardBusinessStepProps> = (props) => {
  const { values: initialValues, onNextStep } = props;
  const [values, setValues] = useState<Values>(initialValues);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => {
      setValues(initialValues);
    },
    [initialValues]
  );

  const handleChange = useCallback(
    (value: string): void => {
      setValues((prevState) => ({
        ...prevState,
        businessType: value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<EventTarget>): void => {
      event.preventDefault();

      if (!values.businessType) {
        setError('Please select a business');
        return;
      }

      onNextStep?.(values);
    },
    [values, onNextStep]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography
            variant="h6"
          >
            Step 1. Business type
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Our architecture is ready for any type of business, just
            let us know who are we talking to.
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {options.map((option) => {
            const isSelected = values.businessType === option.value;

            return (
              <Card
                key={option.value}
                onClick={() => handleChange(option.value)}
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  ...(isSelected && {
                    boxShadow: (theme) => `0px 0px 0px 2px ${theme.palette.primary.main}`
                  }),
                  '&:hover': {
                    ...(!isSelected && {
                      boxShadow: 8
                    })
                  }
                }}
              >
                <CardContent>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        backgroundColor: 'background.default',
                        borderColor: 'divider',
                        borderStyle: 'solid',
                        borderWidth: 1
                      }}
                    >
                      {option.icon}
                    </Avatar>
                    <Stack spacing={1}>
                      <Typography variant="h6">
                        {option.label}
                      </Typography>
                      <Typography color="text.secondary">
                        {option.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
        {error && (
          <FormHelperText
            error
            sx={{ mt: 2 }}
          >
            {error}
          </FormHelperText>
        )}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            size="large"
            type="submit"
            variant="contained"
          >
            Next Step
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

WizardBusinessStep.propTypes = {
  onNextStep: PropTypes.func,
  // @ts-ignore
  values: PropTypes.object.isRequired
};
