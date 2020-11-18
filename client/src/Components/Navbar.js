import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="mx-5">
        <Navbar dark expand="md">
          <NavbarBrand className="text-primary">homeflix</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem className="mx-3">
                <NavLink href="/movies/">Movies</NavLink>
              </NavItem>
              <NavItem className="mx-3">
                <NavLink href="/shows/">TV Shows</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar className="mx-3">
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag="a"
                    className="text-dark"
                    style={styles.link}
                    href="/admin/movies"
                  >
                    Movies Admin
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="text-dark"
                    style={styles.link}
                    href="/admin/shows"
                  >
                    TV Shows Admin
                  </DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

const styles = {
  link: {
    color: "blue",
    textDecoration: "none",
  },
};
