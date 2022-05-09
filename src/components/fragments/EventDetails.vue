<template>
  <div>
    <div class="grid grid-col-1 md:grid-cols-3">
      <div class="flex p-10 xl:p-20">
        <div class="m-auto">
          <h1 class="text-4xl font-bold mb-5">
            {{ eventDetails.title }}
          </h1>
          <div>
            <div class="flex mb-2 flex-row">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 align-baseline" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p>{{ eventDetails.location }}</p>
            </div>
            <div class="flex flex-row mb-2">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 align-baseline" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>{{ `Le ${ formatDate(eventDetails.date) }` }}</p>
            </div>
            <div class="flex flex-row mb-2 ">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 align-baseline" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <p>{{ eventDetails.category.name }}</p>
            </div>
            <p class="mb-8">
              À partir de : {{ formatPrice(eventDetails.price) }}
            </p>

            <div v-if="isAuthenticated" class="grid grid-cols-2 gap-5">
              <router-link
                :to="{ name: 'payment', params: { eventId: eventDetails.id }}"
                class="p-2 lg:px-4 text-white rounded bg-indigo-600 text-center"
              >
                Réserver
              </router-link>

              <!-- <button
                class="p-2 lg:px-4 text-white rounded bg-indigo-600" value="Réserver"
                @click="proceedToCheckoutWithStripe"
              >
                Paiement par Stripe
              </button> -->
            </div>

            <router-link
              v-else
              :to="{ name: 'login'}"
              class="p-2 lg:px-4 text-white rounded bg-indigo-600"
            >
              Réserver
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-span-2 flex">
        <img class="m-auto" :src="eventDetails.cover" alt="event_image" />
      </div>
    </div>
    <div class="flex justify-center flex-col text-center mt-10 px-10">
      <h2 class="mb-6 text-2xl font-semibold">
        Présentation de l'événement
      </h2>
      <div class="mt-5 px-10 lg:px-28">
        <p>{{ eventDetails.description }}</p>
      </div>
      <h2 class="mt-16 mb-10 text-2xl font-semibold lg:mt-28">
        Événements similaires
      </h2>
      <div class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
        <router-link
          v-for="event in similarEvents"
          :key="event.id"
          :to="/evenements/+ event.id"
        >
          <EventCard :event="event" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

import { request, endpoint } from '@/services/api';
import { formatDate, formatPrice } from '@/services/utils';
import EventCard from '@/components/fragments/EventCard';

export default {
  name: 'EventDetails',
  components: {
    EventCard,
  },
  data() {
    return {
      eventDetails: null,
      similarEvents: [],
      isAuthenticated: this.$store.getters.isAuthenticated,
    };
  },
  mounted() {
    this.getEvent();
  },
  methods: {
    formatDate,
    formatPrice,
    async getEvent() {
      try {
        const event = await request({ endpoint: endpoint.customer.events.getEvent(this.$route.params.id) });
        console.log(event);
        this.eventDetails = event;
        await this.getSimilarEvents();
      } catch (error) {
        console.log(error);
      }
    },

    async getSimilarEvents() {
      try {
        const { events: response } = await request({
          endpoint: `${endpoint.customer.events.search(
            1,
            3,
            `?category=${this.eventDetails.category.id}`,
          )
          }
        `,
        });
        this.similarEvents = response;
      } catch (error) {
        console.log(error);
      }
    },

    async proceedToCheckoutWithStripe() {
      try {
        const stripePromise = loadStripe('pk_test_51K6AxCBeWMoOWIvadaSvlrw7x86GQCc9ipvvOcwc1wNQQdCPAhmvlrED6H4DFkSRl4bKKHvSwHTms7d0FCmKB7uS00FoOeRDBm');

        const stripe = await stripePromise;

        const response = await request({
          endpoint: 'stripe/create-checkout-session',
          method: 'POST',
          body: {
            line_items: [{
              price_data: {
                currency: 'eur',
                product_data: {
                  name: this.eventDetails.name,
                  images: [this.eventDetails.cover],
                },
                unit_amount: this.eventDetails.price,
              },
              quantity: 1,
            }],
            id: this.$route.params.id,
          },
        });

        const session = await response.data;

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error((result.error.message));
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};

</script>
