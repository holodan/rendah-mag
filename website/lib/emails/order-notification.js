import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email, name }) => {
  try {
    const title = `New order from ${name}!`;

    const body = `
      Email: ${email}.
    `;

    const image = null;

    const buttonText = 'Log in';

    const buttonLink = `${process.env.SITE_URL}/login?prefillEmail=${email}`;

    const sendSmtpEmail = {
      sender: {
        name: 'Rendah Mag',
        email: 'info@rendahmag.com',
      },
      to: [
        {
          email: 'dan@rendahmag.com',
        },
      ],
      subject: 'New order',
      htmlContent: emailCommon(title, body, image, buttonText, buttonLink),
    };

    const { error } = await sendinblue(sendSmtpEmail);

    if (error) {
      throw new Error(error);
    }

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in welcome-dominion-subscription: ${
        error.message || error.toString()
      }`
    );

    return false;
  }
};
