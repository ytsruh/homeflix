import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class SeasonButton extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      seasons: this.props.seasons
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    var seasons = this.state.seasons.map(season => {
      return (
        <DropdownItem key={season} value={season}>
          Season {season}
        </DropdownItem>
      );
    });
    return (
      <ButtonDropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        size="lg"
      >
        <DropdownToggle caret color="secondary">
          Season
        </DropdownToggle>
        <DropdownMenu onClick={this.props.function}>
          <DropdownItem value="0">All</DropdownItem>
          {seasons}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
