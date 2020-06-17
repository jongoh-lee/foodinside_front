import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import theme from "../../theme";

const NavIcon = ({ focused = true, name, color = theme.darkGreyColor, size = 26 }) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};

export default NavIcon;