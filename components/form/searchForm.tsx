"use client"
import { Search } from "lucide-react"
import Form from "next/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

/**
 * 
 * @param currentPage
 * @description permet de rechercher une recette via son nom
 * @example
 * ```
    return ( <SearchForm currentPage={1} /> )
    ```
 */
const SearchForm = ({currentPage}:{currentPage:number}) => {
    return <Form action={"/web"} className="flex gap-2 my-2">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input type="hidden" name="page" value={currentPage}></input>
            <Input
                type="text"
                placeholder="Rechercher une recette"
                className="pl-10"
                name="query"
            />
        </div>
        <Button type="submit">
            Rechercher
        </Button>
    </Form>
}
export default SearchForm