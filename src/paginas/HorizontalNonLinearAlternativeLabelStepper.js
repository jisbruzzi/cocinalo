import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Preparando', 'Armado', 'Despachado', 'Entregado'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Preparando';
    case 1:
      return 'Step 2: Armado';
    case 2:
      return 'Step 3: Despachado';
    case 3:
      return 'Step 4: Entregado';
    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    activeStep: 0
  };
  
  constructor(props) {
    super(props);
    this.state.activeStep = this.props.activeStep;
  }
 
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper style = {{'background-color': 'transparent'}} alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);