<template>
  <Layout>
    <template #layout-top>
      <StructuredData />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import StructuredData from './components/StructuredData.vue'

const { Layout } = DefaultTheme
</script>

