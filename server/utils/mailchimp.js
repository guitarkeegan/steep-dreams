const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us14",
});

async function run(email) {
//   const response = await mailchimp.ping.get();
  console.log(email);
  const response = await mailchimp.lists.getListMembersInfo(process.env.LIST_ID);
  console.log(response);
}

module.exports = run;