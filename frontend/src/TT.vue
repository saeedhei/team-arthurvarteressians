<!-- MainComponent.vue -->
<template>
  <div>
    <button @click="showSuccess">Show Success Popup</button>
    <button @click="showWarning">Show Warning Popup</button>
    <button @click="showError">Show Error Popup</button>

    <!-- Notification Popup -->
    <NotificationPopup
      :type="notificationType"
      :title="notificationTitle"
      :message="notificationMessage"
      :show="showPopup"
      @close="closePopup"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NotificationPopup from './NotificationPopup.vue';

const showPopup = ref(false);
const notificationType = ref('');
const notificationTitle = ref('');
const notificationMessage = ref('');

const showSuccess = () => {
  notificationType.value = 'success';
  notificationTitle.value = 'Good job!';
  notificationMessage.value = 'You clicked the button!';
  showPopup.value = true;
};

const showWarning = () => {
  notificationType.value = 'warning';
  notificationTitle.value = 'Warning!';
  notificationMessage.value = 'This is a warning message.';
  showPopup.value = true;
};

const showError = () => {
  notificationType.value = 'error';
  notificationTitle.value = 'Error!';
  notificationMessage.value = 'Something went wrong.';
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};
</script>
