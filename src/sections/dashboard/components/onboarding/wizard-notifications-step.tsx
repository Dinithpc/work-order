import type { ChangeEvent, FC, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  Stack,
  Switch,
  Typography
} from '@mui/material';

interface NotificationOption {
  label: string;
  value: string;
}

const options: NotificationOption[] = [
  {
    label: 'Product Update',
    value: 'productUpdate'
  },
  {
    label: 'Weekly News',
    value: 'weeklyNews'
  },
  {
    label: 'Webhooks Alerts',
    value: 'webhooksAlerts'
  }
];

interface Values {
  notifications: string[];
}

interface WizardNotificationsStepProps {
  onNextStep?: (values: Values) => void;
  onPreviousStep?: () => void;
  values: Values;
}

export const WizardNotificationsStep: FC<WizardNotificationsStepProps> = (props) => {
  const { values: initialValues, onNextStep, onPreviousStep } = props;
  const [values, setValues] = useState<Values>(initialValues);

  useEffect(
    () => {
      setValues(initialValues);
    },
    [initialValues]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setValues((prevState) => ({
          ...prevState,
          notifications: [...prevState.notifications, event.target.name]
        }));
      } else {
        setValues((prevState) => ({
          ...prevState,
          notifications: prevState.notifications.filter((value) => {
            return value !== event.target.name;
          })
        }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<EventTarget>): void => {
      event.preventDefault();

      onNextStep?.(values);
    },
    [values, onNextStep]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">
            Step 3. Notifications
          </Typography>
        </div>
        <Card variant="outlined">
          <CardHeader
            subheader="Manage your alert notifications"
            title="Email Notifications"
          />
          <Divider />
          <List disablePadding>
            {options.map((option, index) => {
              const hasDivider = options.length > index + 1;
              const isChecked = values.notifications.includes(option.value);

              return (
                <ListItem
                  divider={hasDivider}
                  key={option.value}
                >
                  <Typography
                    sx={{ flexGrow: 1 }}
                    variant="body2"
                  >
                    {option.label}
                  </Typography>
                  <Switch
                    checked={isChecked}
                    name={option.value}
                    onChange={handleChange}
                  />
                </ListItem>
              );
            })}
          </List>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={onPreviousStep}
            size="large"
            type="button"
          >
            Back
          </Button>
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

WizardNotificationsStep.propTypes = {
  onNextStep: PropTypes.func,
  onPreviousStep: PropTypes.func,
  // @ts-ignore
  values: PropTypes.object.isRequired
};
