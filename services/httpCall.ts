import { HttpMethod } from "@/types/definitions"

interface ApiRequestOptions {
  method?: HttpMethod
  body?: any
  headers?: HeadersInit
}

/**
 * Effectue une requête HTTP vers mon API REST de recettes.
 * @param url L'url d'une route API.
 * @param options Les options de la requête (méthode, body, headers).
 * @param isFormData permet de savoir si on envoie un fichier lors de la soumission du formulaire
 * @example   pour requete sans envoi de fichier const response = await apiRequest('/auth/login', {method: 'POST', headers: {'Content-Type':'application/json'}, body:{"email":"toto@gmail.com", "password":"Azerty123"}})
 * ou pour requete avec envoi de fichier const response = await apiRequest('/auth/register', {method: 'POST', body:{"email":"tata@gmail.com", "password":"Azerty123", "pseudo":"tata"}})
 * @returns La réponse de l'API (succès ou erreur).
 */
export async function apiRequest(
  url: string,
  options: ApiRequestOptions = {},
  isFormData: boolean = false
): Promise<Response> {
  const { method = 'GET', body, headers } = options
  const endpoint = /*'https://recipes-api.webapps24.eu/api'*/'http://localhost:8080/api'+url
  const fetchOptions : RequestInit = {
    method,
    headers: {
      ...(headers || {}),
    },
    body : body ? isFormData ? body : JSON.stringify(body) : undefined,
  }
  const response = await fetch(endpoint, fetchOptions)
  //response.json() || response.text()
  return response
}