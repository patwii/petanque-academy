<template>
  <div class="ad-sidebar">
    <!-- Google AdSense Sidebar Ad -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-2291330857070799"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  try {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  } catch (e) {
    console.error('AdSense error:', e)
  }
})
</script>

<style scoped>
.ad-sidebar {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

