import type { Actions } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';
import { PROMPT_BASE } from '$lib/prompt';

type Node = {
	id: number;
	label: string;
	color: string;
};

type Edge = {
	from: string;
	to: string;
	label: string;
};

export const actions = {
	submit: async ({ request }) => {
		const form_data = await request.formData();
		console.log('submit');

		const prompt: string = PROMPT_BASE + '\n' + form_data.get('info') + '\n-';
		console.log(prompt);

		let textResponse = '';
		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + OPENAI_API_KEY
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: prompt,
				temperature: 0.1,
				max_tokens: 2048,
				frequency_penalty: 0,
				presence_penalty: 0
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				textResponse = data.choices[0].text;
			})
			.catch((error) => console.error(error));

		let nodes_array: Node[] = [];
		let edges_array: Edge[] = [];

		let success = true;

		try {
			let desiredText = textResponse.substring(textResponse.indexOf('{'));
			const jsonResponse = JSON.parse(desiredText);

			jsonResponse.nodes.forEach(function (node: Node) {
				nodes_array.push({
					id: node.id,
					label: node.label,
					color: node.color
				});
			});

			jsonResponse.edges.forEach(function (edge: Edge) {
				edges_array.push({
					from: edge.from,
					to: edge.to,
					label: edge.label
				});
			});
		} catch (error) {
			console.error(error);
			success = false;
		}

		console.log(success)
		return { nodes_array: nodes_array, edges_array: edges_array, success: success };
	}
} satisfies Actions;
