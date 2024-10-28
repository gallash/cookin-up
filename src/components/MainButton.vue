<script lang="ts">
export default {
    props: {
        text: { type: String, required: true }
    }
}
</script>

<template>
    <div style="cursor: pointer;">
        {{ text }}
    </div>

    
</template>

<style scoped>
</style>