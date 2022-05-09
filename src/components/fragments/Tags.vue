<template>
  <div>
    <span class="font-bold">Genres</span>
    <div v-for="tag in tags" :key="tag.name">
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-11">
          <label for="tag.value">
            {{ tag.name }}
          </label>
        </div>
        <div class="col-span-1">
          <input
            :id="tag.value"
            v-model="tagSelected"
            class="form-checkbox"
            type="checkbox"
            :value="tag.value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data() {
    return {
      tagSelected: [],
      tags: [
        {
          name: 'Rap',
          value: 'rap',
        },
        {
          name: 'Pop',
          value: 'pop',
        },
        {
          name: 'Electro',
          value: 'electro',
        },
        {
          name: 'Trance',
          value: 'trance',
        },
        {
          name: 'Rock',
          value: 'rock',
        },
        {
          name: 'Variété',
          value: 'variete',
        },
        {
          name: 'Jazz',
          value: 'jazz',
        },
      ],
    };
  },
  watch: {
    tagSelected() {
      this.$emit('tagSelected', this.tagSelected);
    },
  },
};
</script>
