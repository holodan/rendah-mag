// /* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
// import React from "react";
// import PropTypes from "prop-types";
// import imageUrlBuilder from "@sanity/image-url";
// import sanityClient from "part:@sanity/base/client";
// // import { assemblePageUrl, websiteUrl, toPlainText } from "./frontendUtils";
// import styles from "./userAddress.css";
// import { countries } from "./country-alpha-codes.js";

// const builder = imageUrlBuilder(sanityClient);

// class UsersAddress extends React.PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       results: [],
//     };
//   }

//   render() {
//     const getDominionUsers = async (preview) => {
//       const results = await sanityClient.fetch(
//         `*[_type == "user" && isDominion] | order(dominionSince asc) {
//           name,
//           handle,
//           avatar,
//           address,
//         }`
//       );
//       this.setState({ results });
//       return results;
//     };

//     const parseCountryCode = (country) => {
//       for (let i = 0; i < countries.length; i++) {
//         if (country === countries[i].code) return countries[i].name;
//       }

//       return country;
//     };

//     getDominionUsers();

//     if (this.state.results.length) {
//       return (
//         <>
//           <table className={styles.table}>
//             <tr>
//               <th>Name</th>
//               <th>Line1</th>
//               <th>Line2</th>
//               <th>City</th>
//               <th>State</th>
//               <th>PostCode</th>
//               <th>Country</th>
//             </tr>
//             {this.state.results.map((user) => (
//               <tr>
//                 <td>{user?.name}</td>
//                 <td>{user?.address?.line1}</td>
//                 <td>{user?.address?.line2}</td>
//                 <td>{user?.address?.city}</td>
//                 <td>{user?.address?.state}</td>
//                 <td>{user?.address?.postal_code}</td>
//                 <td>{parseCountryCode(user?.address?.country)}</td>
//               </tr>
//             ))}
//           </table>
//         </>
//       );
//     }

//     return false;
//   }
// }

// export default UsersAddress;

// cms/components/previews/usersAddress.js
import React, { Component } from "react";
import styles from "./userAddress.css";
import { countries } from "./country-alpha-codes.js";

class UsersAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    // Fetch the users from Sanity
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const query = `*[_type == "user" && isDominion] | order(dominionSince asc) {
      name,
      handle,
      avatar,
      address,
    }`;

    const results = await this.props.client.fetch(query);
    this.setState({ results });
  };

  parseCountryCode = (country) => {
    for (let i = 0; i < countries.length; i++) {
      if (country === countries[i].code) return countries[i].name;
    }
    return country;
  };

  render() {
    if (!this.state.results.length) {
      return <div>No users found</div>;
    }

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Line1</th>
            <th>Line2</th>
            <th>City</th>
            <th>State</th>
            <th>PostCode</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {this.state.results.map((user) => (
            <tr key={user._id}>
              <td>{user?.name}</td>
              <td>{user?.address?.line1}</td>
              <td>{user?.address?.line2}</td>
              <td>{user?.address?.city}</td>
              <td>{user?.address?.state}</td>
              <td>{user?.address?.postal_code}</td>
              <td>{this.parseCountryCode(user?.address?.country)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default UsersAddress;
