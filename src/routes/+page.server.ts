import type { Actions } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';

export const actions = {
  submit: async (event) => {
    console.log("submit")

    const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_API_KEY
        }
    }).then((response) => response.json())
    console.log(response)
  }
} satisfies Actions;