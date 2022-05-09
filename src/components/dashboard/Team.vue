<template>
  <div>
    <div class="w-full flex justify-between">
      <h1 class="mt-6 font-bold text-2xl ">
        Les collaborateurs
      </h1>
    </div>
    <div class="mt-10">
      <div class="-my-2">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prénom
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="{firstName, lastName, email} in members">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ lastName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ firstName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <router-link :to="'/'" href="#" class="text-indigo-600 hover:text-indigo-900">
                      Modifier
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { endpoint } from '@/services/api';
import { requestWithRetry } from '../../services/api';

export default {
  data() {
    return {
      members: [],
    };
  },
  mounted() {
    this.listMembers();
  },
  methods: {
    async listMembers() {
      try {
        const response = await requestWithRetry({
          endpoint: `${endpoint.pro.members.getMembers(this.$store.state.auth.user.organisation)}`,
        });
        this.members = response;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
