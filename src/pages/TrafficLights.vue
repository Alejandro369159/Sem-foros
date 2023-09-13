<script setup lang="ts">
import Car from '@/components/Car.vue'
import type { Oritentation } from '@/entities/Direction'
import { getRandomNumber } from '@/utils/getRandomNumber'
import { onMounted, reactive, ref } from 'vue'

const horizontalFlow = ref<{ goTime: number; isMoving: boolean }>({
  goTime: 0,
  isMoving: true
})
const verticalFlow = ref<{ goTime: number; isMoving: boolean }>({
  goTime: 0,
  isMoving: true
})

const numberOfCars = reactive({
  left: getRandomNumber(),
  up: getRandomNumber(),
  right: getRandomNumber(),
  down: getRandomNumber()
})

function horizontalCycle() {
  let horizontalN: number = 0
  horizontalN =
    numberOfCars.left === numberOfCars.right || numberOfCars.left > numberOfCars.right
      ? numberOfCars.left
      : numberOfCars.right
  horizontalFlow.value.goTime = horizontalN * 0.85
  horizontalFlow.value.isMoving = true
  setTimeout(() => {
    horizontalFlow.value.isMoving = false
    numberOfCars.left = 0
    numberOfCars.right = 0
    horizontalFlow.value.goTime = 0
    // Seeder
    numberOfCars.up = getRandomNumber()
    numberOfCars.down = getRandomNumber()
    // Infinite loop
    verticalCycle()
  }, horizontalFlow.value.goTime * 1000)
}

function verticalCycle() {
  let verticalN: number = 0
  verticalN =
    numberOfCars.up === numberOfCars.down || numberOfCars.up > numberOfCars.down
      ? numberOfCars.up
      : numberOfCars.down
  verticalFlow.value.goTime = verticalN * 0.85
  verticalFlow.value.isMoving = true
  setTimeout(() => {
    verticalFlow.value.isMoving = false
    numberOfCars.up = 0
    numberOfCars.down = 0
    verticalFlow.value.goTime = 0
    // Seeder
    numberOfCars.left = getRandomNumber()
    numberOfCars.right = getRandomNumber()
    // Infinite loop
    horizontalCycle()
  }, verticalFlow.value.goTime * 1000)
}

onMounted(() => {
  horizontalCycle()
})
</script>

<template>
  <main>
    <div
      class="mx-auto w-[800px] h-[800px] relative overflow-hidden"
      :class="{
        horizontal: horizontalFlow.isMoving === true,
        vertical: verticalFlow.isMoving === true
      }"
    >
      <div
        id="up"
        :class="{ 'top-[-600px]': !horizontalFlow.isMoving, 'top-3/4': horizontalFlow.isMoving }"
        class="absolute flex flex-col left-[52%] transition-all duration-[6000ms]"
      >
        <!-- up -->
        <Car v-for="car in numberOfCars.up" class="-rotate-90" />
      </div>
      <div
        :class="{ 'right-3/4': verticalFlow.isMoving, 'right-[-600px]': !verticalFlow.isMoving }"
        class="absolute flex top-[52%] transition-all duration-[6000ms]"
      >
        <!-- right -->
        <Car v-for="car in numberOfCars.right" />
      </div>
      <div
        :class="{
          'bottom-3/4': horizontalFlow.isMoving,
          'bottom-[-600px]': !horizontalFlow.isMoving
        }"
        class="absolute flex-col flex right-[52%] transition-all duration-[6000ms]"
      >
        <!-- down -->
        <Car v-for="car in numberOfCars.down" class="rotate-90" />
      </div>
      <div
        :class="{ 'left-3/4': verticalFlow.isMoving, 'left-[-600px]': !verticalFlow.isMoving }"
        class="absolute flex bottom-[52%] transition-all duration-[6000ms]"
      >
        <!-- left -->
        <Car v-for="car in numberOfCars.left" class="flip-car" />
      </div>
    </div>
  </main>
  <div class="mx-auto w-fit">
    <p class="font-semibold text-2xl">
      UP: {{ numberOfCars.up }} cars | {{ verticalFlow.goTime }}s
    </p>
    <p class="font-semibold text-2xl">
      RIGHT: {{ numberOfCars.right }} cars | {{ horizontalFlow.goTime }}s
    </p>
    <p class="font-semibold text-2xl">
      DOWN: {{ numberOfCars.down }} cars | {{ verticalFlow.goTime }}s
    </p>
    <p class="font-semibold text-2xl">
      LEFT: {{ numberOfCars.left }} cars | {{ horizontalFlow.goTime }}s
    </p>
  </div>
</template>

<style scoped>
.flip-car {
  transform: rotateY(180deg);
}
.horizontal {
  background-image: url('@/assets/images/Horizontal.jpg');
}
.vertical {
  background-image: url('@/assets/images/Vertical.jpg');
}
/* .horizontal-time {
  transition-duration: v-bind();
} */
</style>
