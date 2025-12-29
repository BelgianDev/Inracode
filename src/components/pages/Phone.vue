<script setup lang="ts">
import {NIcon} from "naive-ui";
import {
  DeviceDesktopOff as SmallDeviceIcon,
} from '@vicons/tabler'

</script>

<template>
    <div id="small-device-page">
      <n-icon size="124"><SmallDeviceIcon/></n-icon>
      <h3>This website is not supported on smaller devices.</h3>
      <p>Use a desktop computer for the best experience.</p>
    </div>
</template>

<style scoped>
#small-device-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  color: rgb(172, 172, 172);
  font-size: 24px;
  font-weight: bold;
}
</style>