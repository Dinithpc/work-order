import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { WizardBusinessStep } from './wizard-business-step';
import { WizardConfirmationStep } from './wizard-confirmation-step';
import { WizardNotificationsStep } from './wizard-notifications-step';
import { WizardProfileStep } from './wizard-profile-step';
import { WizardSteps } from './wizard-steps';

type Orientation = 'horizontal' | 'vertical';

interface Values {
  businessType: string;
  companyName: string;
  name: string;
  notifications: string[];
  website: string;
}

interface Step {
  description: string;
  title: string;
}

const steps: Step[] = [
  {
    title: 'Step 1',
    description: 'Business'
  },
  {
    title: 'Step 2',
    description: 'Profile'
  },
  {
    title: 'Step 3',
    description: 'Business'
  },
  {
    title: 'Step 4',
    description: 'Confirmation'
  }
];

interface WizardProps {
  orientation?: Orientation;
}

export const Wizard: FC<WizardProps> = (props) => {
  const { orientation = 'horizontal' } = props;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [values, setValues] = useState<Values>({
    businessType: 'saas',
    name: '',
    website: '',
    companyName: '',
    notifications: ['productUpdate', 'weeklyNews']
  });

  const handleBack = useCallback(
    (): void => {
      setActiveStep((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        }

        return prevState;
      });
    },
    []
  );

  const handleNext = useCallback(
    (values: Record<string, any>): void => {
      setValues((prevState) => ({
        ...prevState,
        ...values
      }));

      setActiveStep((prevState) => {
        if (prevState < steps.length - 1) {
          return prevState + 1;
        }

        return prevState;
      });
    },
    []
  );

  const content = useMemo(
    () => {
      switch (activeStep) {
        case 0:
          return (
            <WizardBusinessStep
              onNextStep={handleNext}
              values={{
                businessType: values.businessType
              }}
            />
          );

        case 1:
          return (
            <WizardProfileStep
              onNextStep={handleNext}
              onPreviousStep={handleBack}
              values={{
                companyName: values.companyName,
                name: values.name,
                website: values.website
              }}
            />
          );

        case 2:
          return (
            <WizardNotificationsStep
              onNextStep={handleNext}
              onPreviousStep={handleBack}
              values={{
                notifications: values.notifications
              }}
            />
          );

        case 3:
          return (
            <WizardConfirmationStep
              onPreviousStep={handleBack}
              values={values}
            />
          );

        default:
          return null;
      }
    },
    [activeStep, handleNext, handleBack, values]
  );

  return (
    <Card>
      {
        orientation === 'vertical'
          ? (
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={4}
                >
                  <WizardSteps
                    activeStep={activeStep}
                    orientation={orientation}
                    steps={steps}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={8}
                >
                  {content}
                </Grid>
              </Grid>
            </CardContent>
          )
          : (
            <CardContent>
              <Stack spacing={6}>
                <WizardSteps
                  activeStep={activeStep}
                  orientation={orientation}
                  steps={steps}
                />
                <div>
                  <Container maxWidth="sm">
                    {content}
                  </Container>
                </div>
              </Stack>
            </CardContent>
          )
      }
    </Card>
  );
};

Wizard.propTypes = {
  orientation: PropTypes.oneOf<Orientation>(['vertical', 'horizontal'])
};
