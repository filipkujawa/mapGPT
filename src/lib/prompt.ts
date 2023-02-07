export const PROMPT_BASE = `
Create a graph representation of relationships between concepts in a given input. Each node in the graph should represent a concept with an id, a label property, and a color property (in hex code format). The hex code should represent the node's concept or if unable to assign the concept a color set color to #3ABFF8.The relationship between two nodes is represented as an edge with a to and from property that corresponds to the ids of the two nodes, and a label property. The output should be formatted as a valid JSON object, similar to the example below.

Example:
"Shrek is friends with Donkey"

{
"nodes": [
{ "id": 1, "label": "Shrek", "color": "#7fcc6e"},
{ "id": 2, "label": "Donkey", "color": "#63543e"}
],
"edges": [
{ "from": 1, "to": 2, "label": "Friends"}
]
}

Input:
`;
