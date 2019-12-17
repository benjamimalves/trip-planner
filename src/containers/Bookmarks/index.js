import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Util
import { ENDPOINTS } from '../../utils/api';

// Components
import { ReactComponent as BookmarkSVG } from '../../assets/bookmark-big.svg';
import H2 from '../../components/H2';

// Context API
import AppContext from '../../reducer/context';

// Reducer Constants
import {
  ADD_DATETIME,
  ADD_DEPARTURE,
  ADD_DESTINATION
} from '../../reducer/constants';

// Styled Elements
import BookmarksWrapper from './elements/BookmarksWrapper';

class Bookmarks extends React.Component {
  addPlanner = bookmark => {
    const { dispatch } = this.context;

    dispatch({
      type: ADD_DATETIME,
      datetime: moment()
    });
    dispatch({
      type: ADD_DEPARTURE,
      address: bookmark.departure
    });
    dispatch({
      type: ADD_DESTINATION,
      address: bookmark.destination
    });
  };

  renderBookmark = bookmarks => {
    const bookmark = [];
    bookmarks.forEach(b => {
      bookmark.push(
        <li key={b.title}>
          <button type="button" onClick={() => this.addPlanner(b)}>
            {b.title}
          </button>
        </li>
      );
    });

    return bookmark;
  };

  renderBookmarks = () => {
    const getBookmarks = localStorage.getItem('bookmarks');
    let bookmarks = [];

    if (getBookmarks !== null) {
      bookmarks = JSON.parse(getBookmarks);
    }

    const content = this.renderBookmark(bookmarks);

    return <ul>{content}</ul>;
  };

  render() {
    // const {
    //   state: { planner, departure, destination, datetime }
    // } = this.context;

    return (
      <BookmarksWrapper>
        <div>
          <H2>
            <BookmarkSVG /> Bookmarks
          </H2>
        </div>
        {this.renderBookmarks()}
      </BookmarksWrapper>
    );
  }
}

Bookmarks.contextType = AppContext;

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

export default Bookmarks;
