<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
            :src="require('../assets/hqdefault.jpg')"
            class="my-3"
            contain
            height="200"
        />
      </v-col>
    </v-row>

    <v-row class="mt-12 display-6 border-box">
      <v-col cols="12">
        <v-form ref="form"
                v-model="valid"
                lazy-validation
                v-on:submit.prevent="submitForm">
          <div class="form-group">
            <h2>Enter a whole number between 2 and 9999999: </h2>
            <v-text-field
                class="form-control"
                type="number"
                v-model="form.maxInt"
                :rules="intRules"
                required
                ></v-text-field>
          </div>
          <div class="form-group">
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 mt-3"
                @click="submitForm"
            >
              Submit
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>

    <v-row v-if="isLoading" class="mr-0 mt-5 display-6">
      <v-col cols="12">
        <h2>Sieving Numbers</h2>
        <v-progress-linear
            indeterminate
            stripped
            color="blue text--lighten-2"
        ></v-progress-linear>
      </v-col>
    </v-row>

    <v-row v-show="failed" class="mr-0 mt-5 display-6">

      <v-col >
        <v-alert class="error--text">Error unable to display primes: {{failedMsg}}</v-alert>
      </v-col>
    </v-row>

    <v-row v-show="showReturnBlock" class="mr-0 mt-9 display-6" >
      <v-col cols="2">
        <v-img
            :src="require('../assets/Eratosthenes.gif')"
            contain
        />

      </v-col>
      <v-col cols="10">
        <h2>Eratosthenes Says The Prime Numbers Are: </h2>
        <h3>{{primeNumbersList}}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

export default {
  name: 'SieveOfEratosthenes',
  data: () => ({
    failedMsg: '',
    primeNumbersList: null,
    isLoading: false,
    failed: false,
    valid: true,
    showReturnBlock: false,
    form: {
      maxInt: null,
    },
    intRules:[
      v =>!!v || 'A valid number is required',
      v =>(v > 1) || 'Number must be greater than 1',
      /*v => (v <= 1073741823) || 'Number must be less than 1073741824',*/
      //limiting to prevent browser timeout and out of memory hangups
      v => (v <= 1073741823) || 'Number must be less than 9999999',
      v => /^\d+$/.test(v) || 'Value entered must be a positive, whole number',
    ]

  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        try {
          this.isLoading = true;
          this.showReturnBlock = false;

        /* could send as request param axios.post('/api/sieve?maxInt=' + this.form.maxInt) but
        prefer more 'restful' url */
        axios.post('/api/sieve/' + this.form.maxInt)
            .then((response) => {
              this.isLoading = false;
              this.failed = false;
              this.showReturnBlock = true;
              this.primeNumbersList = response.data;
            })
            .catch((error) => {
              this.showReturnBlock = false;
              this.failedMsg = error.toString();
              this.failed = true;
            });
        } catch (error) {
          this.showReturnBlock = false;
          this.failedMsg = error.toString();
          this.failed = true;
        }
      }
    },
  }
}
</script>

<style scoped>
 /deep/ .v-text-field{
   width: 250px;
 }
 .border-box{
   border: cornflowerblue 2px solid;
 }
</style>
