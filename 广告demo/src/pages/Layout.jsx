import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

@connect((store) => {
  return {
    table: store.table.table,
  };
})


export default class Layout extends React.Component {
  render() {
    const { user } = this.props;
    const { location } = this.props;
    const containerStyle = {
      paddingTop: '60px',
      maxWidth: '1366px',
    };

    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">
              <h1 style={{ marginTop: '15px', marginBottom: '15px' }}> 广告投放管理平台 </h1>
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
