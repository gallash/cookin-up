<script lang="ts">
import Tag from './Tag.vue';

export default {
    components: {Tag},
    props: {
        ingrediente: { type: String, required: true}
    },
    data(){
        return {
            selected: false
        }
    },
    methods: {
        onClick(){
            this.selected = !this.selected; // "this" is required to manipulate this component's data

            if(this.selected){
                this.$emit('addIngredient', this.ingrediente) // This sends back to the parent the signal 'add-ingredient' and the parameter 'this.ingrediente'
            }else{
                this.$emit('removeIngredient', this.ingrediente)
            }
        }
    },
    emits: ['addIngredient', 'removeIngredient']
}
</script>

<template>
    <button 
        class="ingrediente" 
        @click="onClick"
        :aria-pressed="selected"
    >
        <Tag :text="ingrediente" :active="selected" />
    </button>
</template>

<style scoped>
.ingrediente{
    cursor: pointer;
}
</style>