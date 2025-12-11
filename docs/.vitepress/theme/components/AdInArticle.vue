<template>
  <div class="ad-in-article">
    <!-- Google AdSense In-Article Ad -->
    <ins class="adsbygoogle"
         style="display:block; text-align:center;"
         data-ad-layout="in-article"
         data-ad-format="fluid"
         data-ad-client="ca-pub-2291330857070799"></ins>
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
.ad-in-article {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 800px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  min-height: 150px;
}
</style>

