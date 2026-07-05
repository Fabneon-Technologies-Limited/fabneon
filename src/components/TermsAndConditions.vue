<template>
  <PolicyPage title="Terms and Conditions" last-updated="October 15, 2023" @back="$emit('back')">
    <h2>1. Introduction</h2>
    <p>Welcome to Fabneon. These Terms and Conditions govern your use of our website and services. By accessing our website, you agree to these terms in full. If you disagree with any part of these terms, do not use our website.</p>
    
    <h2>2. Intellectual Property Rights</h2>
    <p>Unless otherwise stated, Fabneon and/or its licensors own the intellectual property rights for all material on Fabneon. All intellectual property rights are reserved. You may access this from Fabneon for your own personal use subjected to restrictions set in these terms and conditions.</p>
    <p>You must not:</p>
    <ul>
      <li>Republish material from Fabneon</li>
      <li>Sell, rent or sub-license material from Fabneon</li>
      <li>Reproduce, duplicate or copy material from Fabneon</li>
      <li>Redistribute content from Fabneon</li>
    </ul>

    <h2>3. User Responsibilities</h2>
    <p>As a user of our services, you agree to provide accurate, current, and complete information during any registration or inquiry process. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>

    <h2>4. Services and Deliverables</h2>
    <p>Fabneon provides software development, ERP systems, and digital experiences. The scope, timeline, and cost of any specific project will be detailed in a separate Statement of Work (SOW) or contract signed by both parties. These Terms govern the general relationship between Fabneon and its clients.</p>

    <h2>5. Limitation of Liability</h2>
    <p>In no event shall Fabneon, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Fabneon, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.</p>

    <h2>6. Governing Law</h2>
    <p>These Terms will be governed by and interpreted in accordance with the laws of Bangladesh, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Bangladesh for the resolution of any disputes.</p>
  </PolicyPage>
</template>

<script setup lang="ts">
import PolicyPage from './PolicyPage.vue';

defineEmits(['back']);
</script>
