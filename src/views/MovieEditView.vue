<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: null
    }

});
</script>

<template>
    <div>
        {{data}}
    </div>
</template>