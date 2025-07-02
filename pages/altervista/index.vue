<template>
    <div class="video-page">
        <video
            ref="video"
            class="full-width-video"
            autoplay
            playsinline
            controls
            @canplay="goFullscreen"
        >
            <source src="/assets/ruby.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const video = ref(null)

const goFullscreen = () => {
  const el = video.value
  if (el && el.requestFullscreen) {
    el.requestFullscreen().catch((err) => {
      console.warn('Fullscreen request failed:', err)
    })
  }
}
</script>


<style scoped>
.video-page {
    width: 99vw;
    height: 99vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
}
.full-width-video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    display: block;
}
</style>