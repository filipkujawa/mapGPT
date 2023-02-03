import type { Actions } from './$types';
 
export const actions = {
  submit: async (event) => {
    console.log("submit")
  }
} satisfies Actions;