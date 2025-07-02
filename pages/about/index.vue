<template>
  <div class="disco-mode">
    <img src="assets/rat.gif" class="rat-disco" />
    <h1 class="title">AKM59</h1>
    <div class="letters">
      <p><span>A</span> - Assino</p>
      <p><span>K</span> - Keller</p>
      <p><span>M</span> - Morsanuto</p>
    </div>
    <img ref="akmGun" src="assets/akm59.png" class="akm-gun" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const akmGun = ref(null)

onMounted(() => {
  const el = akmGun.value

  let x = 100
  let y = 100
  let dx = 3
  let dy = 2

  const move = () => {
    const gunWidth = el.offsetWidth
    const gunHeight = el.offsetHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (x + gunWidth >= windowWidth || x <= 0) dx *= -1
    if (y + gunHeight >= windowHeight || y <= 0) dy *= -1

    x += dx
    y += dy

    el.style.left = `${x}px`
    el.style.top = `${y}px`

    requestAnimationFrame(move)
  }

  el.style.left = `${x}px`
  el.style.top = `${y}px`

  requestAnimationFrame(move)
})
</script>

<style scoped>
.disco-mode {
  position: relative;
  overflow: hidden;
  background: linear-gradient(-45deg, #ff0047, #ff9900, #00f7ff, #7f00ff);
  background-size: 400% 400%;
  animation: gradientMove 10s ease infinite;
  color: white;
  text-align: center;
  min-height: 100vh;
  padding: 2rem;
}

@keyframes gradientMove {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.rat-disco {
  width: 200px;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.title {
  font-size: 4rem;
  color: #fff;
  margin: 1rem 0;
  text-shadow: 0 0 10px #000;
}

.letters p {
  font-size: 1.5rem;
  animation: bounceIn 1s ease-out forwards;
}

.letters span {
  color: #00e5ff;
  font-weight: bold;
}

.akm-gun {
  position: fixed;
  width: 150px;
  z-index: 9999;
  pointer-events: none;
}

@keyframes bounceIn {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
