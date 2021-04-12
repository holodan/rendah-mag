/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "part:@sanity/base/client";
// import { assemblePageUrl, websiteUrl, toPlainText } from "./frontendUtils";
import styles from "./userAddress.css";

const builder = imageUrlBuilder(sanityClient);

class TwitterCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  render() {
    const getDominionUsers = async (preview) => {
      const results = await sanityClient.fetch(
        `*[_type == "user" && isDominion] [0..13] {
          name,
          handle,
          avatar,
          address,
        }`
      );
      this.setState({ results });
      return results;
    };

    getDominionUsers();

    if (this.state.results.length) {
      return (
        <>
          <table className={styles.table}>
            <tr>
              <th>Name</th>
              <th>Line1</th>
              <th>Line2</th>
              <th>City</th>
              <th>State</th>
              <th>PostCode</th>
              <th>Country</th>
            </tr>
            {this.state.results.map((user) => (
              <tr>
                <td>{user?.name}</td>
                <td>{user?.address?.line1}</td>
                <td>{user?.address?.line2}</td>
                <td>{user?.address?.city}</td>
                <td>{user?.address?.state}</td>
                <td>{user?.address?.postal_code}</td>
                <td>{user?.address?.country}</td>
              </tr>
            ))}
          </table>
        </>
      );
    }

    return false;
  }
}

export default TwitterCard;
