<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="self-center mt-10 text-lg bg-white rounded shadow overflow-hidden" style="width: 600px;">
      <input v-model="input" type="text" class="block w-full p-5 font-mono">
      <p class="p-5 bg-gray-700 mc-f" style="min-height: 1em; box-sizing: content-box;">
        <component :is="() => compile(input)" />
      </p>
    </div>
<!--    <mc-chatbox class="self-center mt-5" />-->
    <footer class="mt-auto py-5">
      <p class="text-gray-600 text-center">Built with ❤ by KPCC</p>
      <p class="mt-4 text-sm text-gray-400 text-center">Vue {{ version }}</p>
    </footer>
  </div>
</template>

<script>
  import {ref, version} from 'vue'

  import compile from './components/compiler'
  // import McChatbox from './components/chatbox.vue'

  export default {
    name: 'App',

    // components: {
    //   McChatbox,
    // },

    setup () {
      return {
        input: ref('&c&l孤&6帆&e&n远&a影&b碧&9&o空&d尽 &4&m唯&6见&e&l&m&n&o樱&2华&3天&1&m际&5流'),
        compile,

        version,
      }
    },
  }
</script>
