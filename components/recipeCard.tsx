import { Recipe } from "@/types/definitions";
import Link from 'next/link'
import styles from '@/app/ui/styles/card.module.css'
import Image from 'next/image'

/**
 * 
 * @param id
 * @param name
 * @param image
 * @param createdDate
 * @param author
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
    console.log(response.statusText)
  }
    return (
        { result.recipesData ? result.recipesData.map( recipe => (
          <RecipeCard id={recipe.id} name={recipe.name} duration={recipe.duration} durationFormatted={recipe.durationFormatted} image={recipe.image} recipients={recipe.recipients} instructions={recipe.instructions} createdDate={recipe.createdDate} userId={recipe.userId} author={recipe.author} />
        )) : null}
    )
    ```
 */
const RecipeCard : React.FunctionComponent<Recipe> = ({id, name, image, createdDate, author}) => {
 return <div className={styles.card}>
 <div className={styles.cardHeader}>
   <Image src={image} alt={name} layout="fill" objectFit="cover"/>
 </div>
 <div className={styles.cardBody}>
   <h2>{name}</h2>
   <p>Créée le {createdDate} par {author}</p>
 </div>
 <div className={styles.cardFooter}>
   <Link href={`/web/recipe/${id}`}>Voir la recette</Link>
 </div>
</div>
}
export default RecipeCard 