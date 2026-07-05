<template>
  <PolicyPage title="Privacy Policy" last-updated="October 15, 2023" @back="$emit('back')">
    <h2>1. Information We Collect</h2>
    <p>At Fabneon, we are committed to protecting your privacy. We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number.</p>

    <h2>2. How We Use Collected Information</h2>
    <p>Fabneon may collect and use Users personal information for the following purposes:</p>
    <ul>
      <li><strong>To improve customer service:</strong> Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
      <li><strong>To personalize user experience:</strong> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
      <li><strong>To improve our Site:</strong> We may use feedback you provide to improve our products and services.</li>
      <li><strong>To send periodic emails:</strong> We may use the email address to respond to their inquiries, questions, and/or other requests.</li>
    </ul>

    <h2>3. How We Protect Your Information</h2>
    <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>

    <h2>4. Sharing Your Personal Information</h2>
    <p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>

    <h2>5. Third Party Websites</h2>
    <p>Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.</p>

    <h2>6. Changes to This Privacy Policy</h2>
    <p>Fabneon has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
  </PolicyPage>
</template>

<script setup lang="ts">
import PolicyPage from './PolicyPage.vue';

defineEmits(['back']);
</script>
