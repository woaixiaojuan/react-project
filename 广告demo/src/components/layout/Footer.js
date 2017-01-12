import React from "react";

// export default class Footer extends React.Component {

//   render() {
//   	const footerStyle = {
//     marginTop: "60px"
//   	};
//     return (
//     	<footer style={footerStyle} > This is Footer &copy; 2016 </footer>
//     );
//   }
// }
// Stateless Functional Components
export default function Footer(props) {
  const footerStyle = {
     margin: "60px 0px"
  };
  return <footer style={footerStyle} > 掌中全景广告投放管理平台 &copy; 2016 </footer>
}