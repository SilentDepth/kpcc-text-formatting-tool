<template>
  <div class="bg-black bg-opacity-75 flex flex-col justify-end mc-f" style="width: 460px; height: 240px;">
    <p v-for="(l, idx) of lines" :key="idx">
      <component  :is="() => compile(l)" />
    </p>
    <div>
      <input v-model="input" type="text" class="block w-full bg-transparent" @keypress.enter="onEnter">
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue'

  import compile from './compiler'

  export default {

    setup () {
      let lines = ref([])
      let input = ref('')

      return {
        lines,
        input,
        compile,

        onEnter () {
          lines.value.push(input.value)
          input.value = ''
        },
      }
    },
  }
</script>
