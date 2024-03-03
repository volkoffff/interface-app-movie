<template>
  <div>
    <Multiselect
      v-model="value"
      mode="tags"
      placeholder="choisir des acteurs"
      class="multiselect-green"
      :close-on-select="false"
      :allow-absent="true"
      :create-option="true"
      :options="transformedOptions"
    />
  </div>
  <slot></slot>
  <!-- {{ value }} -->
</template>

<script>
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";

export default {
  props: {
    actorsID: {
      type: [Number],
      default: null,
    },
  },
  components: {
    Multiselect,
  },
  setup(props, { emit }) {
    const value = ref(props.actorsID);
    const apiData = ref([]);

    const transformedOptions = computed(() => {
      return apiData.value.map((actor) => ({
        value: actor.id,
        label: actor.firstName + " " + actor.lastName,
      }));
    });

    onMounted(async () => {
      await loadDataFromApi();
      console.log("Initial value:", value.value);
      console.log("Transformed options:", transformedOptions.value);

      envoyerInfoAuParent(value);
    });

    watch(value, (newValue) => {
      // Cette fonction sera déclenchée à chaque fois que la valeur de "value" change
      console.log("Nouvelle valeur de data:", newValue);
      envoyerInfoAuParent(newValue);
    });

    async function loadDataFromApi() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/actors/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        apiData.value = response.data["hydra:member"];
        console.log(apiData.value);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    }

    function envoyerInfoAuParent(newValue) {
      // Émettre un événement personnalisé vers le composant parent
      console.log(newValue);
      emit("infoAuParent", newValue);
    }

    return {
      value,
      transformedOptions,
      loadDataFromApi,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
.multiselect-tags input {
  background: transparent !important;
}
.multiselect-green {
  --ms-tag-bg: #d1fae5;
  --ms-tag-color: #052296;
  --ms-option-bg-selected: #3786e5;
  --ms-font-size: 1rem;
  --ms-line-height: 1.375;
  --ms-bg: #ffffff00;
  --ms-bg-disabled: #f3f4f6;
  --ms-border-color: #d1d5db;
  --ms-border-width: 1px;
  --ms-border-color-active: #d1d5db;
  --ms-border-width-active: 1px;
  --ms-radius: 4px;
  --ms-py: 0.5rem;
  --ms-px: 0.875rem;
  --ms-ring-width: 3px;
  --ms-ring-color: #3786e530;
  --ms-placeholder-color: #9ca3af;
  --ms-max-height: 10rem;

  --ms-spinner-color: #3786e5;
  --ms-caret-color: #999999;
  --ms-clear-color: #999999;
  --ms-clear-color-hover: #000000;

  --ms-tag-font-size: 0.875rem;
  --ms-tag-line-height: 1.25rem;
  --ms-tag-font-weight: 600;
  --ms-tag-bg: #3786e5;
  --ms-tag-bg-disabled: #9ca3af;
  --ms-tag-color: #ffffff;
  --ms-tag-color-disabled: #ffffff;
  --ms-tag-radius: 4px;
  --ms-tag-py: 0.125rem;
  --ms-tag-px: 0.5rem;
  --ms-tag-my: 0.25rem;
  --ms-tag-mx: 0.25rem;

  --ms-tag-remove-radius: 4px;
  --ms-tag-remove-py: 0.25rem;
  --ms-tag-remove-px: 0.25rem;
  --ms-tag-remove-my: 0rem;
  --ms-tag-remove-mx: 0.125rem;

  --ms-dropdown-bg: #393c3c;
  --ms-dropdown-border-color: #4c4f4f;
  --ms-dropdown-border-width: 1px;
  --ms-dropdown-radius: 4px;

  --ms-group-label-py: 0.3rem;
  --ms-group-label-px: 0.75rem;
  --ms-group-label-line-height: 1.375;
  --ms-group-label-bg: #303132;
  --ms-group-label-color: #374151;
  --ms-group-label-bg-pointed: #303132;
  --ms-group-label-color-pointed: #374151;
  --ms-group-label-bg-disabled: #f3f4f6;
  --ms-group-label-color-disabled: #d1d5db;
  --ms-group-label-bg-selected: #059669;
  --ms-group-label-color-selected: #303132;
  --ms-group-label-bg-selected-pointed: #0c9e70;
  --ms-group-label-color-selected-pointed: #303132;
  --ms-group-label-bg-selected-disabled: #75cfb1;
  --ms-group-label-color-selected-disabled: #d1fae5;

  --ms-option-font-size: 1rem;
  --ms-option-line-height: 1.375;
  --ms-option-bg-pointed: gray;
  --ms-option-color-pointed: #1f2937;
  --ms-option-bg-selected: #3786e5;
  --ms-option-color-selected: gray;
  --ms-option-bg-disabled: gray;
  --ms-option-color-disabled: #d1d5db;
  --ms-option-bg-selected-pointed: #26c08e;
  --ms-option-color-selected-pointed: gray;
  --ms-option-bg-selected-disabled: gray;
  --ms-option-color-selected-disabled: #d1fae5;
  --ms-option-py: 0.5rem;
  --ms-option-px: 0.75rem;

  --ms-empty-color: #4b5563;
}
.multiselect {
  background: rgba(83, 85, 85, 0.707);
  position: relative;
  color: rgb(230, 226, 226);
  border: 0;
  border-radius: 8px;
  /* padding: 10px 15px 10px 10px; */
}
.multiselect-tags-search {
  background: transparent;
  display: none;
}
input {
  display: none;
  flex-grow: 0 !important;
}
</style>
