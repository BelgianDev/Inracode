<script setup lang="ts">
import { NCode, NSpace } from 'naive-ui';

const code = `
#include <M5Stack.h>

void setup() {
     M5.begin();
}

void loop() {

}
`
</script>

<template>
  <div style="margin: 15px">
    <n-code show-line-numbers language="cpp" :code="code">

    </n-code>
  </div>
</template>