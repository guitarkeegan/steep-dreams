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
        console.log(response);
} catch (err) {
    console.log(err);
}
}

const addNewUserTags = async (email) => {
    try {
    const response = await mailchimp.lists.updateListMemberTags(
      process.env.LIST_ID,
      md5(email.toLowerCase()),
      { tags: [{ name: "New Member", status: "active" }] }
    );
    console.log(response);
    } catch (err) {
        console.log(err)
    }
  };
  
//   const getNewMemberTags = async () => {
//     try {
//     const response = await mailchimp.lists.tagSearch(process.env.LIST_ID);
//     console.log(response);
//     } catch (err) {
//         console.log(err);
//     }
//   };

// const getAllCampaigns = async () => {
//     const response = await mailchimp.campaigns.list();
//     console.log(response);
//   };

// const sendCampaignToNewMembers = async () => {
//     const response = await mailchimp.campaigns.send(process.env.CAMPAIGN_ID);
//     console.log(response);
//   };

// const updateCampaignSettings = async () => {
//     const response = await mailchimp.campaigns.update(process.env.CAMPAIGN_ID, {
//       settings: {
//         status: 'save'
//       },
//     });
//     console.log(response);
//   };
  
// const resendCampaign = async () => {
//     const response = await mailchimp.campaigns.createResend(process.env.CAMPAIGN_ID);
//     console.log(response);
//   };


module.exports = {signUpEmail, addNewUserTags}