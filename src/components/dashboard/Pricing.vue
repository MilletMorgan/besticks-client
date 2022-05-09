<template>
  <div class="container mx-auto antialiased text-gray-900 bg-white">
    <main class="mx-4 my-16">
      <div class="text-center">
        <h1 class="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
          Nos <span class="font-semibold">offres</span> pour vos <span class="font-semibold text-primary">besoins</span>
        </h1>
        <p class="text-sm font-normal text-gray-400">
          Sélectionnez ci-dessous une de nos offres pour votre entreprise, votre agence, votre association.
        </p>
        <p class="text-sm font-normal text-gray-400">
          Commencez dès aujourd'hui à proposez vos évènements au plus grand nombre!
        </p>
      </div>

      <!-- Plan switch -->
      <div class="flex items-center justify-center mt-10 space-x-4">
        <span class="text-base font-medium">Mensuel</span>
        <button
          class="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="billPlan == 'monthly' ? billPlan = 'annually' : billPlan = 'monthly'"
        >
          <div class="w-16 h-8 transition bg-indigo-500 rounded-full shadow-md outline-none"></div>
          <div
            class="absolute inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform bg-white rounded-full shadow-sm top-1 left-1"
            :class="{ 'translate-x-0': billPlan == 'monthly', 'translate-x-8': billPlan == 'annually' }"
          ></div>
        </button>
        <span class="text-base font-medium">Annuel</span>
      </div>

      <!-- Plans -->
      <div
        class="flex flex-col items-center justify-center mt-16 space-y-8 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0"
      >
        <template v-for="(plan, i) in plans">
          <section :key="i" class="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
            <!-- Price -->
            <div class="flex-shrink-0">
              <span
                class="text-4xl font-medium tracking-tight"
                :class="plan.name == 'Pro' ? 'text-green-500' : ''"
                v-text="`${billPlan == 'monthly' ? plan.price.monthly : plan.price.annually}€`"
              ></span>
              <span class="text-gray-400" v-text="billPlan == 'monthly' ? '/mois' : '/an'"></span>
            </div>

            <!--  -->
            <div class="flex-shrink-0 pb-6 space-y-2 border-b">
              <h2 class="text-2xl font-normal" v-text="plan.name"></h2>
              <p class="text-sm text-gray-400" v-text="plan.discretion"></p>
            </div>

            <!-- Features -->
            <ul class="flex-1 space-y-4">
              <template v-for="(feature, i) in plan.features">
                <li :key="i" class="flex items-start">
                  <svg
                    class="w-6 h-6 text-green-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-3 text-base font-medium">
                    {{ feature }}
                  </span>
                </li>
              </template>
            </ul>

            <!-- Button -->
            <div class="flex-shrink-0 pt-4">
              <router-link
                :to="`/inscription/pro?plan=${plan.name}`"
                class="inline-flex items-center justify-center w-full max-w-xs px-4 py-2 transition-colors border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="plan.name == 'Pro' ? 'bg-indigo-500 text-white hover:bg-indigo-700' : 'hover:bg-indigo-500 hover:text-white'"
                v-text="`Choisir ${plan.name}`"
              ></router-link>
            </div>
          </section>
        </template>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Pricing',
  data() {
    return {
      isNavOpen: false,

      billPlan: 'monthly',

      plans: [
        {
          name: 'Basic',
          discretion: 'L\'offre de base pour bien commencer et proposer vos événements.',
          price: {
            monthly: 29,
            annually: 29 * 11,
          },
          features: ['5 événements', 'Accès au dashboard'],
        },
        {
          name: 'Pro',
          discretion: 'Passer à l\'offre Pro et rendez vos événements incontournable.',
          price: {
            monthly: 59,
            annually: 59 * 11,
          },
          features: ['20 événements', 'Accès au dashboard', '2 événements mis en avant', 'Support'],
        },
        {
          name: 'Sur mesure',
          discretion: 'Pour répondre à vos besoins spécifiques, nous avons une offre spécifique.',
          price: {
            monthly: 139,
            annually: 139 * 11,
          },
          features: ['50 événements', 'Accès au dashboard', '10 événements mis en avant', 'Support'],
        },
      ],
    };
  },
};
</script>
