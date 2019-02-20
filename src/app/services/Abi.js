let abi =
[
	{
		"constant": true,
		"inputs": [],
		"name": "getCountOfEntranses",
		"outputs": [
			{
				"name": "count",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "determineWinner",
		"outputs": [
			{
				"name": "number",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkStatusAndWinner",
		"outputs": [
			{
				"name": "status",
				"type": "uint8"
			},
			{
				"name": "number",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "number",
				"type": "uint8"
			}
		],
		"name": "enter",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "number",
				"type": "uint8"
			}
		],
		"name": "getAddressesByNumber",
		"outputs": [
			{
				"name": "addresses",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

export default abi;