import type { ChangeEvent, FC, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material';

interface Values {
  companyName: string;
  name: string;
  website: string;
}

interface WizardProfileStepProps {
  onNextStep?: (values: Values) => void;
  onPreviousStep?: () => void;
  values: Values;
}

export const WizardProfileStep: FC<WizardProfileStepProps> = (props) => {
  const { values: initialValues, onPreviousStep, onNextStep } = props;
  const [values, setValues] = useState<Values>(initialValues);

  useEffect(
    () => {
      setValues(initialValues);
    },
    [initialValues]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<EventTarget>): void => {
      event.preventDefault();

      onNextStep?.({
        companyName: values.companyName,
        name: values.name,
        website: values.website
      });
    },
    [values, onNextStep]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">
            Step 2. Profile details
          </Typography>
        </div>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Website"
            name="website"
            onChange={handleChange}
            placeholder="https://"
          />
          <TextField
            fullWidth
            label="Company name"
            name="companyName"
            onChange={handleChange}
          />
          <Stack spacing={1}>
            <Typography variant="subtitle2">
              Photo
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Avatar
                sx={{
                  height: 58,
                  width: 58
                }}
              />
              <Stack spacing={1}>
                <div>
                  <Button
                    size="small"
                    type="button"
                    variant="outlined"
                  >
                    Upload new picture
                  </Button>
                </div>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Recommended dimensions: 200x200, maximum file size: 5MB
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: 3 }}
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

WizardProfileStep.propTypes = {
  onNextStep: PropTypes.func,
  onPreviousStep: PropTypes.func,
  // @ts-ignore
  values: PropTypes.object.isRequired
};
