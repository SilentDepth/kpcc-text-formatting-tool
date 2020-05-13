<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <header class="p-10">
      <h1 class="text-lg font-medium tracking-widest text-gray-700 text-center uppercase">Minecraft Text Formatting Tool</h1>
    </header>
    <div class="mx-10 text-lg bg-white rounded shadow overflow-hidden">
      <p class="p-5 bg-gray-700 mc-f" style="min-height: 1em; box-sizing: content-box;">
        <component :is="() => compile(input)" />
      </p>
      <input v-model="input" type="text" class="block w-full p-5 font-mono">
    </div>
    <footer class="mt-auto py-5">
      <p class="text-gray-600 text-center">Built with ❤ by KPCC</p>
      <p class="mt-4 text-sm text-gray-400 text-center">Vue {{ version }}</p>
    </footer>
  </div>
</template>

<script>
  import {ref, version} from 'vue'

  import compile from './components/compiler'

  export default {
    name: 'App',

    setup () {
      return {
        input: ref('&c&l孤&6帆&e&n远&a影&b碧&9&o空&d尽 &4&m唯&6见&e&l&m&n&o樱&2华&3天&1&m际&5流'),
        compile,

        version,
      }
    },
  }
</script>
