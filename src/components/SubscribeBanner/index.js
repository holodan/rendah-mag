/* eslint-disable react/sort-comp, react/prefer-stateless-function, no-return-assign,
react/no-danger */

import React, { PureComponent } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

export class SubscribeBanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputPlaceHolder: 'ENTER EMAIL TO SUBSCRIBE' };
  }

  render() {
    const CustomForm = ({ status, message, onValidated }) => {
      let email;

      const submit = () =>
        email &&
        email.value.indexOf('@') > -1 &&
        onValidated({
          EMAIL: email.value,
        });

      const submitInit = (e) => {
        e.preventDefault();
        submit();
      };

      return (
        <div>
          <form onSubmit={submitInit} action="" noValidate>
            <input
              ref={node => (email = node)}
              type="email"
              placeholder={this.state.inputPlaceHolder}
            />
            <br />
          </form>
          {status === 'sending' && <div className="message">sending...</div>}
          {status === 'error' && (
            <div className="message" dangerouslySetInnerHTML={{ __html: message }} />
          )}
          {status === 'success' && (
            <div className="message" dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </div>
      );
    };

    const url = 'https://rendahmag.us17.list-manage.com/subscribe/post?u=df0d549f92845c8dfc4d99dde&amp;id=2904b740be';
    return (
      <div className="subscribeBanner">
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
      </div>
    );
  }
}

export default SubscribeBanner;
