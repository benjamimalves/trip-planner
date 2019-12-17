import React from 'react';

// Components
import { ReactComponent as Timer } from '../../assets/timer.svg';
import { ReactComponent as BookmarkSVG } from '../../assets/bookmark-small.svg';
import { ReactComponent as CloseSVG } from '../../assets/close.svg';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import InputField from '../../components/InputField';
import ButtonField from '../../components/ButtonField';
import H2 from '../../components/H2';

// Context API
import AppContext from '../../reducer/context';

// Styled Elements
import TripWrapper from './elements/TripWrapper';

class Trip extends React.Component {
  state = {
    showBookmarkModal: false,
    bookmarkVal: ''
  };

  handleChangeBookmarkVal = e => {
    this.setState({
      bookmarkVal: e.currentTarget.value
    });
  };

  handleShowBookmarkModal = () => {
    const { showBookmarkModal } = this.state;

    this.setState({
      showBookmarkModal: !showBookmarkModal
    });
  };

  submitBookmarkTrip = e => {
    e.preventDefault();

    const { bookmarkVal } = this.state;
    const {
      state: { departure, destination }
    } = this.context;

    const bookmarks = localStorage.getItem('bookmarks');
    const currentBookmark = {
      title: bookmarkVal,
      departure,
      destination
    };
    let setBookmarks;

    if (bookmarks === null) {
      setBookmarks = [currentBookmark];
    } else {
      setBookmarks = JSON.parse(bookmarks);
      setBookmarks.push(currentBookmark);
    }

    localStorage.setItem('bookmarks', JSON.stringify(setBookmarks));

    this.handleShowBookmarkModal();

    // eslint-disable-next-line no-alert
    alert('Bookmark saved'); // TODO: Add to create a Alert component on the future for this ugly alert
  };

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

  renderBookmarkModal = () => {
    const { bookmarkVal } = this.state;
    return (
      <form
        name="bookmark-form"
        id="bookmark-form"
        onSubmit={this.submitBookmarkTrip}
      >
        <button
          type="button"
          className="btn-close"
          onClick={this.handleShowBookmarkModal}
        >
          <CloseSVG />
        </button>
        <InputField
          id="bookmark-trip"
          name="bookmark-trip"
          placeholder="Bookmark Name"
          className="second-type"
          value={bookmarkVal}
          onChange={this.handleChangeBookmarkVal}
        />
        <input
          type="submit"
          className="btn-submit"
          value="Save trip"
          onClick={this.submitBookmarkTrip}
          disabled={bookmarkVal.length === 0}
        />
      </form>
    );
  };

  render() {
    const { showBookmarkModal } = this.state;
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
        <ButtonField onClick={this.handleShowBookmarkModal}>
          <BookmarkSVG /> Bookmark trip
        </ButtonField>
        {this.renderPlan(planner)}
        {showBookmarkModal && this.renderBookmarkModal()}
      </TripWrapper>
    );
  }
}

Trip.contextType = AppContext;

Trip.propTypes = {};

Trip.defaultProps = {};

export default Trip;
