import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }
  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const detailPage = location.pathname === '/' ? 'active' : '';
    const zuoPinPage = location.pathname.match(/^\/zuoPinPage/) ? 'active' : '';
    const navClass = collapsed ? 'collapse' : '';
    return (
			<nav className="navbar navbar-default navbar-fixed-top" role="navgation">
				<div className="container-fluid" style={{ width: '85%' }}>
					<div className="navbar-header">
						<button className="navbar-toggle" type="button" onClick={this.toggleCollapse.bind(this)}>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="javascript:void(0)">微信投票活动管理平台</a>
					</div>
					<div className={'navbar-collapse ' + navClass} id="navbar-main">
						<ul className="nav navbar-nav">
							<li className={detailPage}>
								<Link to="/">活动管理</Link>
							</li>
							<li className={zuoPinPage} style={{ display: location.pathname.indexOf('zuoPinPage') !== -1 ? 'block' : 'none' }}>
								<a href="javascript:void(0)">作品管理</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
  }
}
// style={{ display: location.pathname.indexOf('detailPage') !== -1 || location.pathname.indexOf('zuoPinPage') !== -1 ? 'block' : 'none' }}
							// <li>
							// 	<IndexLink to="/" onClick={this.toggleCollapse.bind(this)}> 微信投票活动管理平台 </IndexLink>
							// </li>

