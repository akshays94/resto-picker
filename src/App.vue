<template>
  <v-app>
    <v-app-bar app flat dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>RESTO</span>
        <span class="font-weight-light">PICKER</span>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
    </v-app-bar>
    <v-content>
      <Criteria/>
      <HelloWorld/>
    </v-content>
    <v-footer>
      <div class="flex-grow-1"></div>
      <div>Akshay Suresh &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import Criteria from '@/components/Criteria'
import Vuex from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Criteria
  },
  created () {
    this.setCategories()
    this.setCities()
    this.setDefaultCity()
  },
  methods: {
    ...Vuex.mapActions([
      'setCategories',
      'setCities',
      'setDefaultCity'
    ])
  }
}
</script>
