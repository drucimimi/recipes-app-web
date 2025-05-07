type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiRequestOptions {
  method?: HttpMethod
  body?: any
  headers?: HeadersInit
}

/**
 * Effectue une requête HTTP vers mon API REST de recettes.
 * @param url L'url d'une route API.
 * @param options Les options de la requête (méthode, body, headers).
 * @example   pour requete sans envoi de fichier const response = await apiRequest('/auth/login', {method: 'POST', headers: {'Content-Type':'application/json'}, body:{"email":"toto@gmail.com", "password":"Azerty123"}})
 * ou pour requete avec envoi de fichier const response = await apiRequest('/auth/register', {method: 'POST', body:{"email":"tata@gmail.com", "password":"Azerty123", "pseudo":"tata"}})
 * @returns La réponse de l'API (succès ou erreur).
 */
export async function apiRequest(
  url: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const { method = 'GET', body, headers } = options
  const endpoint = 'https://recipes-api.webapps24.eu/api'+url
  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...(headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }
  const response = await fetch(endpoint, fetchOptions)
  //response.json() || response.text()
  return response
}