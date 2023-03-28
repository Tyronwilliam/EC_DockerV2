require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (toEmail, name, templateId, link) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: toEmail }],
    templateId: templateId,
    params: {
      name: name,
      email: toEmail,
      link: link,
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
