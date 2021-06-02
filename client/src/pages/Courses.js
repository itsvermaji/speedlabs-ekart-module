import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Course Details', 'Overview', 'Pricing', 'Resources'];
}
const CourseDetails = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="productName"
        render={({ field }) => (
          <TextField
            id="product-name"
            label="Product Name"
            variant="outlined"
            placeholder="Product Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="CreatorName"
        render={({ field }) => (
          <TextField
            id="creator-name"
            label="Creator Name"
            variant="outlined"
            placeholder="Creator Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Grid>
        <Controller
          control={control}
          name="Category"
          render={({ field }) => (
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              placeholder="Category"
              halfWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="SubCategory"
          render={({ field }) => (
            <TextField
              id="subcategory"
              label="SubCategory"
              variant="outlined"
              placeholder="Sub-Category"
              halfWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </Grid>
      <Controller
        control={control}
        name="Label"
        render={({ field }) => (
          <TextField
            id="label"
            mr={5}
            label="Label"
            variant="outlined"
            placeholder="Label"
            halfWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="Status"
        render={({ field }) => (
          <TextField
            id="status"
            label="Status"
            variant="outlined"
            placeholder="Status"
            halfWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

const Overview = () => {
  return (
    <>
      <Paper>Overview</Paper>
    </>
  );
};

const Pricing = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="productPrice"
        render={({ field }) => (
          <TextField
            id="productprice"
            label="Product Price"
            variant="outlined"
            placeholder="Product Price(Rs.)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="Discount"
        render={({ field }) => (
          <TextField
            id="discount"
            label="Discount"
            variant="outlined"
            placeholder="Discount"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="netPrice"
        render={({ field }) => (
          <TextField
            id="netprice"
            label="Net Price"
            variant="outlined"
            placeholder="Net Price"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="setCommission"
        render={({ field }) => (
          <TextField
            id="setcommission"
            label="Set Commission"
            variant="outlined"
            placeholder="Set Commission"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="minimumCoursePrice"
        render={({ field }) => (
          <TextField
            id="minimumcourseprice"
            label="Minimum Course Price (Rs.)"
            variant="outlined"
            placeholder="Minimum Course Price (Rs.)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="coupons"
        render={({ field }) => (
          <TextField
            id="coupons"
            label="Coupons"
            variant="outlined"
            placeholder="Coupons"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="sales"
        render={({ field }) => (
          <TextField
            id="sales"
            label="Sales"
            variant="outlined"
            placeholder="Sales"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const Resources = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <TextField
            id="cardNumber"
            label="Card Number"
            variant="outlined"
            placeholder="Enter Your Card Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardMonth"
        render={({ field }) => (
          <TextField
            id="cardMonth"
            label="Card Month"
            variant="outlined"
            placeholder="Enter Your Card Month"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardYear"
        render={({ field }) => (
          <TextField
            id="cardYear"
            label="Card Year"
            variant="outlined"
            placeholder="Enter Your Card Year"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CourseDetails />;
    case 1:
      return <Overview />;
    case 2:
      return <Pricing />;
    case 3:
      return <Resources />;
    default:
      return 'unknown step';
  }
}

const Courses = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      productName: '',
      creatorName: '',
      category: '',
      subCategory: '',
      label: '',
      status: '',
      productPrice: '',
      discount: '',
      netPrice: '',
      setCommission: '',
      minimumCoursePrice: '',
      coupons: '',
      sales: '',
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Grid>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                  >
                    skip
                  </Button>
                )}
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Grid>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default Courses;
