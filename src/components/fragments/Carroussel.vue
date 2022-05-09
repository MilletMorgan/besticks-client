<template>
  <div class="flex w-full h-screen/4 md:h-screen/2 relative">
    <div class="flex w-full h-full bg-gray-900 absolute bg-opacity-30 cursor-pointer" @click="$router.push({ path: `/evenements/${highlightedEvents[currentHighlightedEvent].id }` })">
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-10 self-center ml-3 cursor-pointer absolute text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      @click="previousHiglightedEvent"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <img
      class="w-full h-full object-cover drop-shadow-2xl cursor-pointer select-none transition-opacity"
      :src="highlightedEvents[currentHighlightedEvent] && (highlightedEvents[currentHighlightedEvent].highlightedCover || highlightedEvents[currentHighlightedEvent].cover)"
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-10 self-center mr-3 cursor-pointer absolute right-0 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      @click="nextHiglightedEvent"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</template>

<script>
import { request, endpoint } from '@/services/api';

export default {
  name: 'Carroussel',
  data() {
    return {
      highlightedEvents: [],
      currentHighlightedEvent: 0,
    };
  },
  created() {
    this.getHighlightedEvents();
  },
  methods: {
    async getHighlightedEvents() {
      try {
        const response = await request({ endpoint: endpoint.customer.events.highlightedEvents });
        this.highlightedEvents = response.eventsHighlighted;
      } catch (e) {
        console.error(e);
      }
    },
    nextHiglightedEvent() {
      this.currentHighlightedEvent += 1;
      if (this.currentHighlightedEvent >= this.highlightedEvents.length) {
        this.currentHighlightedEvent = 0;
      }
    },
    previousHiglightedEvent() {
      this.currentHighlightedEvent -= 1;
      if (this.currentHighlightedEvent < 0) {
        this.currentHighlightedEvent = this.highlightedEvents.length - 1;
      }
    },
  },
};
</script>
