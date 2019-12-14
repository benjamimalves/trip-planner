import React from 'react';
import PropTypes from 'prop-types';

// Util
import { ENDPOINTS } from '../../utils/api';

// Reducer
import { ADD_DEPARTURE, ADD_DESTINATION } from '../Main/constants';

// Global Components
import ButtonField from '../../components/ButtonField';
import InputField from '../../components/InputField';

// Containers

// Styled Elements
import AddressWrapper from './elements/AddressWrapper';

class Address extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      suggest: []
    };

    this.abortController = new AbortController();
  }

  loadAddress = async url => {
    this.abortController.abort();
    this.abortController = new AbortController();

    try {
      const response = await fetch(url, {
        signal: this.abortController.signal
      });
      const data = await response.json();

      this.setState({
        suggest: data
      });
    } catch (ex) {
      if (ex.name === 'AbortError') {
        return;
      }

      throw ex;
    }
  };

  getAddressSugestions = e => {
    const REQUESTURL = `${ENDPOINTS.GEOCODING.SUGGEST}${e.currentTarget.value}`;
    this.loadAddress(REQUESTURL);
  };

  addAddress = address => {
    const { dispatch, id } = this.props;

    this.setState({
      suggest: []
    });

    const REQUESTURL = `${ENDPOINTS.GEOCODING.FROMID}${address.locationId}`;

    fetch(REQUESTURL)
      .then(data => data.json())
      .then(data => {
        dispatch({
          type: id === 'departure' ? ADD_DEPARTURE : ADD_DESTINATION,
          address: data
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  renderAutoComplete = () => {
    const { suggest } = this.state;
    const { id } = this.props;

    if (suggest.length === 0) {
      return null;
    }

    const Addresses = suggest.map(p => (
      <li key={p.locationId}>
        <ButtonField
          className="is-transparent"
          id={`add-${id}`}
          onClick={() => this.addAddress(p)}
        >
          <b>{p.header}</b> - {p.address}
        </ButtonField>
      </li>
    ));

    return <ul className="address-autocomplete">{Addresses}</ul>;
  };

  render() {
    const { id, placeholder, className } = this.props;

    return (
      <AddressWrapper>
        <InputField
          placeholder={placeholder}
          id={id}
          onKeyUp={this.getAddressSugestions}
          className={className}
          // value={address ? `${address.header} - ${address.address}` : ''}
        />
        {this.renderAutoComplete()}
      </AddressWrapper>
    );
  }
}

Address.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  info: PropTypes.oneOfType([PropTypes.object])
};

Address.defaultProps = {
  id: '',
  placeholder: '',
  className: '',
  dispatch: () => {},
  info: {}
};

export default Address;
