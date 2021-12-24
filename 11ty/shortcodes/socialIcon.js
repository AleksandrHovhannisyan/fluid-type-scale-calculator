const simpleIcons = require('simple-icons');

const socialIcon = (icon) => {
  return simpleIcons.Get(icon).svg;
};

module.exports = socialIcon;
