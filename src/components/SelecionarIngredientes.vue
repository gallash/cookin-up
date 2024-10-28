<script lang="ts">
import CardCategoria from './CardCategoria.vue';
import { obterCategorias } from '@/http';
import type { TCategoria } from '@/types/TCategoria';
import MainButton from './MainButton.vue';

export default{
  name: "SelecionarIngredientes", // Necessary for the <KeepAlive include>, which searches for the name of the component
  components: {CardCategoria, MainButton},
  data(){
      return{
          categorias: [] as TCategoria[]
      }
  },
  async created(){
      this.categorias = await obterCategorias()
  },
  emits: ['addIngredient', 'removeIngredient', "fetchRecipes"]
}
</script>

<template>
    <section class="selecionar-ingredientes">
        <h1 class="cabecalho titulo-ingredientes">Ingredientes</h1>
        <p class="paragrafo-lg instrucoes">
            Selecione abaixo os ingredientes que você quer usar nesta receita
        </p>

        <ul class="categorias">
            <li v-for="categoria in categorias" :key="categoria.nome">
                <CardCategoria 
                  :categoria="categoria" 
                  @add-ingredient="$emit('addIngredient', $event)"
                  @remove-ingredient="$emit('removeIngredient', $event)"
                />
            </li>
        </ul>
        <p class="paragrafo dica">
            *Atenção: consideramos que você tem em casa sal, pimenta e água.
        </p>

        <br />

        <MainButton text="Buscar receitas" @click="$emit('fetchRecipes');" />
    </section>
</template>

<style scoped>
.selecionar-ingredientes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .titulo-ingredientes {
    color: var(--verde-medio, #3D6D4A);
    display: block;
    margin-bottom: 1.5rem;
  }
  
  .instrucoes {
    margin-bottom: 2rem;
  }
  
  .categorias {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .dica {
    align-self: flex-start;
    margin-bottom: 3.5rem;
  }
  
  @media only screen and (max-width: 767px) {
    .dica {
      margin-bottom: 2.5rem;
    }
  }
  
</style>