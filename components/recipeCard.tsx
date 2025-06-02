"use client"
import styles from '@/app/ui/styles/card.module.css'
import Image from 'next/image'
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { Recipe } from '@/types/definitions'

type RecipeComponentProps = {
  recipe: Recipe
}

/**
 * 
 * @param recipe
 * @description permet d'afficher sous forme de card les informations clés d'une recette
 * @example
 * ```
 * const response = await apiRequest('/recipes', {headers:{'Content-Type':'application/json'}})
  let result:PageRecipe = {
    recipesData: [],
    totalPages: 0,
    totalRecipes: 0
  }
  if(response.status == 200){
    result = await response.json()
  } else {
    console.error(response.statusText)
  }
    return (
        { result.recipesData ? result.recipesData.map( recipe => (
          <RecipeCard recipe={recipe} />
        )) : null}
    )
    ```
 */
const RecipeCard : React.FunctionComponent<RecipeComponentProps> = ({recipe}) => {
  const router = useRouter()
  const redirectToRecipePage = () => {
    router.push(`/web/recipe/${recipe.id}`)
  }
 return <div className={styles.card} key={recipe.id}>
 <div className={styles.cardHeader}>
   <Image src={recipe.image.replace("10.0.2.2", "localhost")} alt={recipe.name} layout="fill" objectFit="cover"/>
 </div>
 <div className={styles.cardBody}>
   <h2>{recipe.name}</h2>
   <p>Créée le {recipe.createdDate} par {recipe.author}</p>
 </div>
 <div className={styles.cardFooter}>
  <Button type="button" onClick={redirectToRecipePage}>Voir la recette</Button>
 </div>
</div>
}
export default RecipeCard 