export const PROMPT_BASE = `
Example:
"Shrek is friends with Donkey"

{
    "nodes": [
        { "id": 1, "label": "Shrek", "color": "#7fcc6e"},
        { "id": 2, "label": "Donkey", "color": "#63543e"}
    ],
    "edges": [
        { "from": 1, "to": 2,  "label": "Friends"}
    ]
}

Task: Given an input, extrapolate as many relationships between concepts as possible from the input. 
Every node, a concept, has an id, a label property, and a color property (Hex Code).
If possible, the hex code should represent the node or just be #3ABFF8.
Every edge, a relationship between two nodes, has a to-and-from property corresponding to the ids of the two nodes and a label property. 
The output should be formatted like the example output above, in valid json so it can be parsed.

Input: 
`;
