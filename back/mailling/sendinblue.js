require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (toEmail, name) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SENDINBLUE_APIKEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: toEmail }],
    templateId: 1,
    params: {
      name: name,
      email: toEmail,
    },
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendEmail,
};
