import React from 'react';
import PropTypes from 'prop-types';

// Components
import { ReactComponent as Timer } from '../../assets/timer.svg';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ButtonField from '../../components/ButtonField';
import H2 from '../../components/H2';

// Context API
import AppContext from '../../reducer/context';

// Styled Elements
import TripWrapper from './elements/TripWrapper';

class Trip extends React.Component {
  renderItems = items => {
    const steps = [];
    items.leg.bigSteps.forEach(s => {
      steps.push(<li key={s.fullInstructions}>{s.fullInstructions}</li>);

      if (s.innerSteps.length > 0) {
        s.innerSteps.forEach(is => {
          steps.push(
            <li key={is.fullInstructions} className="is-inner-step">
              {is.fullInstructions}
            </li>
          );
        });
      }
    });

    return steps;
  };

  renderPlan = planner => {
    const content = this.renderItems(planner);

    return <ul>{content}</ul>;
  };

  render() {
    const {
      state: { planner, departure, destination, datetime }
    } = this.context;

    if (!planner) {
      return <Loading />;
    }

    if (planner.length === 0) {
      return <Error />;
    }

    const title = `${departure.header} ${departure.address} - ${destination.header} ${destination.address}`;

    return (
      <TripWrapper>
        <div>
          <H2>{title}</H2>
          <time dateTime={datetime.format('YYYY-MM-DD HH:mm')}>
            <Timer /> {datetime.format('YYYY-MM-DD HH:mm')}
          </time>
        </div>
        <ButtonField>Bookmark trip</ButtonField>
        {this.renderPlan(planner)}
      </TripWrapper>
    );
  }
}

Trip.contextType = AppContext;

Trip.propTypes = {};

Trip.defaultProps = {};

export default Trip;
