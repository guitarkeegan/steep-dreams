const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require('md5');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us14",
});

async function signUpEmail(email) {
//   const response = await mailchimp.ping.get();
    // const response = await mailchimp.lists.getListMembersInfo(process.env.LIST_ID);
    // console.log(response);
    try {
        const response = await mailchimp.lists.addListMember(process.env.LIST_ID,{
        email_address: email,
        status: "subscribed",
    });
        const newTagsResponse = await addNewUserTags(email);
        console.log(response);
        console.log(newTagsResponse)

} catch (err) {
    console.log(err);
}
}

const addNewUserTags = async (email) => {
    const response = await mailchimp.lists.updateListMemberTags(
      process.env.LIST_ID,
      md5(email.toLowerCase()),
      { tags: [{ name: "New Member", status: "active" }] }
    );
    console.log(response);
  };


module.exports = signUpEmail;