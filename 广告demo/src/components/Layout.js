import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/userActions';
import { fetchPosts } from '../actions/postsActions';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

@connect((store) => {
  return {
    user: store.user.user,
    table: store.table.table,
    posts: store.post.posts,

  };
})

export default function Layout() {

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  render() {
    const { user } = this.props;
    const { location } = this.props;
    const containerStyle = {
      marginTop: '60px',
    };

    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          <div className="row">
              <div className="col-lg-12">
              <h1> welcome {user.name}</h1>
              {this.props.children}
            </div>
          </div>
        <Footer />
        </div>

      </div>

    );
  }
}


// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchUser } from '../actions/userActions';
// import { fetchPosts } from '../actions/postsActions';

// @connect((store) => {
//   return {
//     user: store.user.user,
//     userFetched: store.user.fetched,
//     post: store.post.posts,
//   };
// })
// // // Connected Component:
// // let Layout = connect({
// //   user: store.user.user,
// // })(Layout);
// export default class Layout extends React.Component {
//   componentWillMount() {
//     this.props.dispatch(fetchUser());
//   }
//   fetchPost() {
//     this.props.dispatch(fetchPosts());
//   }
//   render() {
//     const { user, post } = this.props;
//     if (!post.length) {
//       return (<div> <h1> welcome {user.name}</h1>
//       <button onClick={this.fetchPost.bind(this)}> check your posts </button></div>)
//     }
//     const mappedPosts = post.map(item => <li key={item.id}> {item.text}</li>)
//     return (<div>
//       <h1> {user.name}</h1>
//       <ul>{mappedPosts}</ul>
//     </div>)
//   }
// }
