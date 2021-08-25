<template>
  <v-app>
    <v-main>
      <SieveOfEratosthenes/>
    </v-main>
  </v-app>
</template>

<script>
import SieveOfEratosthenes from './components/SieveOfEratosthenes';

export default {
  name: 'App',

  components: {
    SieveOfEratosthenes,
  },

  data: () => ({
    //
  }),
};
</script>
