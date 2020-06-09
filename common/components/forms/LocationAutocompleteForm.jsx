// @flow

import React from "react";
import {LocationInfo} from "../common/location/LocationInfo.js";
import {CountryData} from "../constants/Countries.js";
import type {Dictionary} from "../types/Generics.jsx";
import HiddenFormFields from "./HiddenFormFields.jsx";
import LocationAutocomplete from "../common/location/LocationAutocomplete.jsx";
import _ from "lodash";

export const LocationFormInputsByEntity: Dictionary<(LocationInfo) => string> = {
  Projects: {
    project_location: (location: LocationInfo) => location.location_id,
    project_country: (location: LocationInfo) => location.country,
    project_state: (location: LocationInfo) => location.state,
    project_city: (location: LocationInfo) => location.city,
    project_latitude: (location: LocationInfo) => location.latitude,
    project_longitude: (location: LocationInfo) => location.longitude
  }
};

type Props = {|
  location: ?LocationInfo,
  country: ?CountryData,
  formInputs: Dictionary<(LocationInfo) => string>,
  onSelect: (LocationInfo) => null
|};

type State = {|
  location: ?LocationInfo
|};

export class LocationAutocompleteForm extends React.PureComponent<Props, State> {
  constructor(props: Props): void {
    super();
    this.state = {
      location: props.location
    };
  }
  
  componentWillReceiveProps(nextProps: Props): void {
    if(!_.isEqual(nextProps.location, this.state.location)) {
      this.setState({location: nextProps.location});
    }
  }

  onOptionSelect(location: LocationInfo): void {
    this.setState({location: location}, () => this.props.onSelect(location));
  }

  render(): ?React$Node {
    // TODO: Insert placeholder into LocationAutocomplete
    return (
      <React.Fragment>
        <HiddenFormFields
          sourceObject={this.state.location}
          fields={this.props.formInputs || LocationFormInputsByEntity.Projects}
        />
        <LocationAutocomplete
          countryCode={this.props.country && this.props.country.ISO_3}
          onSelect={this.onOptionSelect.bind(this)}
          selected={this.state.location}
        />
      </React.Fragment>
    );
  }
}

export default LocationAutocompleteForm;
