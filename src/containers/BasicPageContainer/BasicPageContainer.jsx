import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import BasicPageComponent from '../../components/BasicPageComponent/BasicPageComponent';

class BasicPageContainer extends Component {
  render() {
    const {} = this.props;
    return (
      <Fragment>
          <BasicPageComponent/>
      </Fragment>
    );
  }
}
const mapStateFromProps = state => ({});

const mapDispatchFromProps = dispatch => ({});

export default connect(mapStateFromProps, mapDispatchFromProps)(BasicPageContainer);
