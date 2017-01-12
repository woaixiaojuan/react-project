import React from 'react';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import './layout.less';

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      paddingTop: '60px',
      maxWidth: '85%',
      width: '85%',
    };
    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

