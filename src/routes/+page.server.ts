import type { Actions } from './$types';
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

		if (!form_data.get('API_KEY') || form_data.get('API_KEY') == '') {
			return { nodes_array: [], edges_array: [], success: false, message: 'No API key provided.' };
		} else if (!form_data.get('info') || form_data.get('info') == '') {
			return { nodes_array: [], edges_array: [], success: false, message: 'No prompt provided.' };
		}

		const prompt: string = PROMPT_BASE + '\n' + form_data.get('info') + '\n-';

		let textResponse = '';
		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + form_data.get('API_KEY')
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

		return { nodes_array: nodes_array, edges_array: edges_array, success: success, message: null };
	}
} satisfies Actions;
