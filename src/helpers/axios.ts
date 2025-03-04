import Http from '@/helpers/http'
import { toValue } from 'vue'
import type { AxiosResponse } from 'axios'

/**
 * Performs a GET request to the specified URL using the configured Axios client.
 * @param {string} url - The endpoint URL (relative to baseURL)
 * @param {object} [config] - Optional Axios request configuration
 * @returns {Promise<AxiosResponse>} The response from the API
 * @throws {Error} If the request fails
 */
export async function get(url: string, config = {}): Promise<AxiosResponse> {
  return Http.get(toValue(url), config)
}

/**
 * Performs a POST request to the specified URL with the provided data.
 * @param {string} url - The endpoint URL (relative to baseURL)
 * @param {any} data - The data to send in the request body
 * @param {object} [config] - Optional Axios request configuration
 * @returns {Promise<AxiosResponse>} The response from the API
 * @throws {Error} If the request fails
 */
export async function post(
  url: string,
  data: any,
  config = {},
): Promise<AxiosResponse> {
  return Http.post(toValue(url), data, config)
}

/**
 * Performs a PUT request to the specified URL with the provided data.
 * @param {string} url - The endpoint URL (relative to baseURL)
 * @param {any} data - The data to send in the request body
 * @param {object} [config] - Optional Axios request configuration
 * @returns {Promise<AxiosResponse>} The response from the API
 * @throws {Error} If the request fails
 */
export async function put(
  url: string,
  data: any,
  config = {},
): Promise<AxiosResponse> {
  return Http.put(toValue(url), data, config)
}

/**
 * Performs a DELETE request to the specified URL.
 * @param {string} url - The endpoint URL (relative to baseURL)
 * @param {object} [config] - Optional Axios request configuration
 * @returns {Promise<AxiosResponse>} The response from the API
 * @throws {Error} If the request fails
 */
export async function del(url: string, config = {}): Promise<AxiosResponse> {
  return Http.delete(toValue(url), config)
}
