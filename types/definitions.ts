export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type Profile = {
    id:string,
    pseudo:string,
    avatar:string
}

export type UserResponse = { userId: string; profile: Profile, token: string, roleName:string}

export type Recipe = {
    id:string,
    name:string,
    duration:string,
    durationFormatted:string,
    image:string,
    recipients:string[],
    instructions:string,
    createdDate:string,
    userId:string,
    author:string
}

export type PageRecipe = {
    recipesData: Recipe[],
    totalPages:number,
    totalRecipes:number
}