const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us14",
});

async function run(email) {
//   const response = await mailchimp.ping.get();
    // const response = await mailchimp.lists.getListMembersInfo(process.env.LIST_ID);
    // console.log(response);
    try {
        const response = await mailchimp.lists.addListMember(process.env.LIST_ID,{
        email_address: email,
        status: "subscribed",
    });
  console.log(response);
} catch (err) {
    console.log(err);
}
}

module.exports = run;