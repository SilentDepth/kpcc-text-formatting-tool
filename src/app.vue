<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <header class="p-10">
      <h1 class="text-lg font-medium tracking-widest text-gray-700 text-center uppercase">Minecraft Text Formatting Tool</h1>
    </header>
    <div class="mx-10 text-lg bg-white rounded shadow overflow-hidden">
      <p class="p-5 bg-gray-700 mc-f" style="min-height: 1em; box-sizing: content-box;">
        <span v-if="!input" class="text-gray-400">Displays formatted text here</span>
        <component v-else :is="() => compile(input)" />
      </p>
      <input v-model="input" type="text" placeholder="Type raw text here" class="block w-full p-5 font-mono">
    </div>
    <div data-section="code-hints" class="self-center mt-10 flex">
      <section class="flex-grow flex-shrink">
        <h2>Text Color</h2>
        <div class="grid grid-flow-col grid-rows-4 row-gap-3 col-gap-4">
          <p><code>&0</code><span class="mc-0">black</span></p>
          <p><code>&1</code><span class="mc-1">dark blue</span></p>
          <p><code>&2</code><span class="mc-2">dark green</span></p>
          <p><code>&3</code><span class="mc-3">dark aqua</span></p>
          <p><code>&4</code><span class="mc-4">dark red</span></p>
          <p><code>&5</code><span class="mc-5">dark purple</span></p>
          <p><code>&6</code><span class="mc-6">gold</span></p>
          <p><code>&7</code><span class="mc-7">gray</span></p>
          <p><code>&8</code><span class="mc-8">dark gray</span></p>
          <p><code>&9</code><span class="mc-9">blue</span></p>
          <p><code>&a</code><span class="mc-a">green</span></p>
          <p><code>&b</code><span class="mc-b">aqua</span></p>
          <p><code>&c</code><span class="mc-c">red</span></p>
          <p><code>&d</code><span class="mc-d">light purple</span></p>
          <p><code>&e</code><span class="mc-e">yellow</span></p>
          <p><code>&f</code><span class="mc-f">white</span></p>
        </div>
      </section>
      <section class="ml-4 flex-grow flex-shrink">
        <h2>Font Style</h2>
        <div class="space-y-3">
          <p><code>&l</code><span class="mc-l">bold</span></p>
          <p><code>&m</code><span class="mc-m">strikethrough</span></p>
          <p><code>&n</code><span class="mc-n">underline</span></p>
          <p><code>&o</code><span class="mc-o">italic</span></p>
        </div>
      </section>
    </div>
    <footer class="mt-auto py-5">
      <p class="text-gray-600 text-center">Built with ❤ by KPCC</p>
      <p class="mt-4 text-sm text-gray-400 text-center">Vue {{ version }}</p>
    </footer>
  </div>
</template>

<script>
  import {ref, version, watch} from 'vue'

  import compile from './components/compiler'

  function getInitInput () {
    let querystring = location.search.slice(1)
    if (!querystring) return ''

    let match = /(?:^|&)s=(.+?)(?:$|&)/.exec(querystring)
    if (!match) return ''

    return decodeURIComponent(match[1])
  }

  export default {
    name: 'App',

    setup () {
      let input = ref(decodeURIComponent(getInitInput()))

      watch(input, input => {
        history.replaceState(null, null, '?s=' + encodeURIComponent(input))
      })

      return {
        input,
        compile,

        version,
      }
    },
  }
</script>

<style lang="scss" scoped>
  [data-section=code-hints] {
    h2 {
      @apply mb-5 text-gray-600 font-medium tracking-wider uppercase;
    }

    p {
      @apply flex items-center;
    }

    code {
      @apply mr-2 p-1 bg-gray-200 rounded;
    }
  }
</style>
