<script lang="ts">
import SelecionarIngredientes from './SelecionarIngredientes.vue';
import Tag from './Tag.vue';
import ShowRecipes from './ShowRecipes.vue';


type Pages = "ShowIngredients" | "ShowRecipes";

export default {
    components: {SelecionarIngredientes, Tag, ShowRecipes},
    data(){
        return{
            ingredients: [] as string[],
            content: 'ShowIngredients' as Pages
        }
    },
    methods: {
      addIngredient(ingredient: string){ // I kinda need to know what I would be receiving 
        this.ingredients.push(ingredient);
      },
      removeIngredient(ingredient: string){
        this.ingredients = this.ingredients.filter(i => i !== ingredient)
      }
    }
}
</script>

<template>
    <main class="conteudo-principal">
        <section class="">
            <span class="subtitulo-lg sua-lista-texto">Sua lista:</span>

            <ul v-if="ingredients.length > 0" class="ingredientes-sua-lista">
                <li v-for="ingrediente in ingredients" :key="ingrediente">
                  <Tag :text="ingrediente" active />
                </li>
            </ul>

            <p v-else class="paragrafo lista-vazia">
                <img src="../assets/images/icones/lista-vazia.svg" alt="Ícone de pesquisa">
                Sua lista está vazia, selecione ingredientes para iniciar.
            </p>
            <br>
            <br>
            <br>

            <!--Keep Alive stores in cache the state of the component, preventing it from reloading/restoring its original state when loaded back-->
            <KeepAlive include="SelecionarIngredientes"> 
              <SelecionarIngredientes 
                v-if="content === 'ShowIngredients'"
                @add-ingredient="addIngredient"
                @remove-ingredient="removeIngredient"
                @fetch-recipes="content = 'ShowRecipes'"
              />
  
              <ShowRecipes 
                v-else-if="content === 'ShowRecipes'" 
                :ingredientes="ingredients"
                @editar-ingredientes="content = 'ShowIngredients'"
              />
            </KeepAlive>
        </section>
    </main>

</template>

<style scoped>
.conteudo-principal {
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--creme, #FFFAF3);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

.sua-lista-texto {
  color: var(--coral, #F0633C);
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
}

.ingredientes-sua-lista {
  display: flex;
  justify-content: center;
  gap: 1rem 1.5rem;
  flex-wrap: wrap;
}

.lista-vazia {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  color: var(--coral, #F0633C);
  text-align: center;
}

@media only screen and (max-width: 1300px) {
  .conteudo-principal {
    padding: 5rem 3.75rem;
    gap: 3.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .conteudo-principal {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
}

</style>