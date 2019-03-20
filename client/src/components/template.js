import React from "react";
import PropTypes from 'prop-types';

class TemplateComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string
  };

  static defaultProps = {
    name: 'TemplateComponent1'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const TemplateComponent1 = (props) => {
  return (
    <div>

    </div>
  )
}

TemplateComponent1.propTypes = {
  name: PropTypes.string
};

TemplateComponent1.defaultProps = {
  name: 'TemplateComponent1'
};

export default TemplateComponent;
