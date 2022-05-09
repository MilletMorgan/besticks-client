<template>
  <div>
    <form class="my-32 w-6/12 mx-auto mt-10 shadow rounded p-5" @submit.prevent="checkout">
      <div v-if="errors.length">
        <p class="font-bold">
          Please correct the following error(s):
        </p>
        <ul>
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>

      <h1 class="text-center mb-6 text-2xl">
        Paiement par carte
      </h1>

      <h4>Information sur le moyen de payment</h4>
      <label>
        <input
          v-model="creditNumber"
          name="credit-number"
          class="form-input"
          type="tel"
          inputmode="numeric"
          pattern="[0-9\s]{13,19}"
          autocomplete="cc-number"
          maxlength="16"
          placeholder="xxxx xxxx xxxx xxxx"
        >
      </label>
      <div class="grid grid-cols-2 gap-3 mt-3">
        <input v-model="creditExpires" class="form-input" maxlength="5" name="credit-expires" placeholder="MM / YY" type="tel" />
        <input v-model="creditCvc" class="form-input" maxlength="3" name="credit-cvc" pattern="\d*" placeholder="CVC" type="tel" />
      </div>

      <div class="w-full flex">
        <button class="mx-auto mt-4 p-2 lg:px-4 text-white rounded bg-indigo-600" type="submit">
          Payer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { request, endpoint } from '@/services/api.js';

export default {
  name: 'Payment',
  data() {
    return {
      event: {},
      errors: [],
      creditNumber: null,
      creditExpires: '',
      creditCvc: null,
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    // checkForm(e) {
    //   if (this.creditNumber && this.creditExpires && this.creditCvc) {
    //     return true;
    //   }

    //   this.errors = [];

    //   if (!this.creditNumber) {
    //     this.errors.push('Credit card number required.');
    //   } else if (!this.creditExpires) {
    //     this.errors.push('Credit card date expiration required.');
    //   } else if (!this.creditCvc) {
    //     this.errors.push('Credit card CVC required.');
    //   } else {
    //     this.checkout();
    //   }

    //   e.preventDefault();
    // },

    async getEvent() {
      try {
        const response = await request({ endpoint: endpoint.customer.events.getEvent(this.$route.params.eventId) });

        this.event = response;
      } catch (e) {
        console.error(e);
      }
    },
    async checkout() {
      try {
        await request({
          endpoint: endpoint.customer.events.buyEvent,
          method: 'PUT',
          body: {
            eventId: this.$route.params.eventId,
            userId: this.$store.getters.getUser.user.id,
          },
        });

        await this.$router.push({ name: 'success' });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
