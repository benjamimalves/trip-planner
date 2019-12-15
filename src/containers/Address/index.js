import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import '../../assets/picker.min.css';

// Util
import { ENDPOINTS } from '../../utils/api';

// Context API
import AppContext from '../../reducer/context';

// Reducer Constants
import { ADD_DEPARTURE, ADD_DESTINATION } from '../../reducer/constants';

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
      suggest: [],
      addressVal: '',
      datetime: moment()
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
    const val = e.currentTarget.value;
    const REQUESTURL = `${ENDPOINTS.GEOCODING.SUGGEST}${val}`;
    this.setState({
      addressVal: val
    });
    this.loadAddress(REQUESTURL);
  };

  addAddress = address => {
    const { id } = this.props;
    const { dispatch } = this.context;

    this.setState({
      suggest: []
    });

    const REQUESTURL = `${ENDPOINTS.GEOCODING.FROMID}${address.locationId}`;

    fetch(REQUESTURL)
      .then(data => data.json())
      .then(data => {
        this.setState({
          addressVal: `${data.header} - ${data.address}`
        });

        dispatch({
          type: id === 'departure' ? ADD_DEPARTURE : ADD_DESTINATION,
          address: data
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  handleChange = momentDate => {
    this.setState({
      datetime: momentDate
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
    const { datetime, addressVal } = this.state;

    return (
      <AddressWrapper>
        <InputField
          placeholder={placeholder}
          id={id}
          onChange={this.getAddressSugestions}
          className={className}
          value={addressVal}
        />
        {id === 'destination' && (
          <DatetimePickerTrigger moment={datetime} onChange={this.handleChange}>
            <InputField
              id="datepickerVal"
              className="second-type"
              type="text"
              value={datetime.format('YYYY-MM-DD HH:mm')}
              readOnly
              // value={address ? `${address.header} - ${address.address}` : ''}
            />
          </DatetimePickerTrigger>
        )}
        {this.renderAutoComplete()}
      </AddressWrapper>
    );
  }
}

Address.contextType = AppContext;

Address.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

Address.defaultProps = {
  id: '',
  placeholder: '',
  className: ''
};

export default Address;
