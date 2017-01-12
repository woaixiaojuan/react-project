import React from "react";
import { IndexLink, Link } from "react-router";


export default class Nav extends React.Component{
	constructor(){
		super()
		this.state={
			collapsed : true,
		};
	}
	toggleCollapse(){
		const collapsed = !this.state.collapsed;
		this.setState({collapsed});
	}
	render() {
		const { location } = this.props;
		const { collapsed } = this.state;
		const featuredClass = location.pathname ==="/" ? "active":"";
		const archivesClass = location.pathname.match(/^\/archives/) ? "active":"";
    const settingsClass =  location.pathname.match(/^\/settings/) ? "active":"";
		const testformClass =  location.pathname.match(/^\/testform/) ? "active":"";
		const navClass = collapsed ? "collapse" : "";

		return (
			   <nav class="navbar navbar-default navbar-fixed-top" role="navgation">
			      <div class="container">
				        <div class="navbar-header">
				          <button class="navbar-toggle" type="button" onClick={this.toggleCollapse.bind(this)}>
					            <span class="icon-bar"></span>
					            <span class="icon-bar"></span>
					            <span class="icon-bar"></span>
				          </button>
				        </div>

			        	<div class={"navbar-collapse "+ navClass} id="navbar-main">
				          <ul class="nav navbar-nav">




				          </ul>
			        	</div>

			      </div>
			    </nav>

			);
	}
}

// <li class="{settingsClass}">
// <IndexLink to="/"  onClick={this.toggleCollapse.bind(this)}> 主页 </IndexLink>
// </li>
// <li class="{featuredClass}">
// <Link to="featured"  onClick={this.toggleCollapse.bind(this)}> Featured </Link>
// </li>
// <li class="{archivesClass}">
// <Link to="archives"  onClick={this.toggleCollapse.bind(this)}> Archives </Link>
// </li>
//  <li class="{testformClass}">
// <Link to="testform"  onClick={this.toggleCollapse.bind(this)}> Form </Link>
// </li>