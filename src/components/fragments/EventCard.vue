<template>
  <div class="rounded overflow-hidden shadow-md hover:shadow-lg transition bg-white">
    <div class="overflow-hidden relative">
      <img class=" bg-cover h-48 w-full object-cover" :src="event.cover">
    </div>
    <div class="p-4 flex flex-col">
      <span class="text-2xl flex font-medium whitespace-nowrap rightFade relative">
        {{ event.title }}
      </span>
      <div class="mb-2 flex text-sm md:whitespace-nowrap rightFade relative">
        <span class="mr-1">
          {{ event.city }}
        </span> -
        <span class="ml-1">
          {{ formatDate(event.date) }}
        </span>
      </div>
      <div class="flex justify-start">
        <div v-for="tag in event.tags" :key="tag" class="mr-2 bg-green-50 text-primary font-semibold p-2 rounded-lg">
          <span>{{ tag }}</span>
        </div>
      </div>
      <div v-if="!myEvent" class="flex justify-between mt-6">
        <div class="text-lg">
          <p class="text-sm text-gray-700">
            À partir de:
          </p>
          <span class="font-semibold">{{ formatPrice(event.price) }}</span>
        </div>
        <button class="px-1 lg:px-2 rounded text-primary border-primary border-2 hover:text-white hover:bg-primary" value="Réserver">
          Réserver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, formatPrice } from '@/services/utils';

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    myEvent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
  methods: {
    formatDate,
    formatPrice,
  },
};
</script>
