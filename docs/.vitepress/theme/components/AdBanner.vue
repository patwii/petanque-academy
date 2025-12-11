<template>
  <div class="ad-banner">
    <!-- Google AdSense Banner Ad -->
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
    // Load AdSense ads
    if (typeof window !== 'undefined') {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  } catch (e) {
    console.error('AdSense error:', e)
  }
})
</script>

<style scoped>
.ad-banner {
  margin: 2rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-banner ins {
  min-height: 90px;
}
</style>

