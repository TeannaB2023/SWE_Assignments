/**
 * @author: Teanna Barrett (@02924893)
 *  
 * Sources:
 * Trie Tree 
   * https://www.softnami.com/posts_pr/trie-tree-with-javascript.html
   * https://learnersbucket.com/tutorials/data-structures/trie-data-structure-in-javascript/
 * DFS: 
   * https://codeburst.io/implementing-dfs-and-bfs-using-javascript-5034f3cee9a1
   * https://www.geeksforgeeks.org/boggle-set-2-using-trie/?ref=rp
   * In Class and Office Hours Instruction from Dr. Burge
 * 
 * Status: DFS skips over tiles (probably based on wrong visited table)
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
class TrieNode {
	constructor(char) {
		this.isEnd = false;
		this.key = char;
		this.children = {};
	}
} 

class TrieTree {
	constructor() {
		this.root = new TrieNode(null);
	}

	insert(word) {
		let node = this.root;
		for (let i = 0; i < word.length; i++) {
			// check to see if character node exists in children.
			if (!node.children[word[i]]) {
				// if it doesn't exist, we then create it.
				node.children[word[i]] = new TrieNode(word[i]);
			}

			// proceed to the next depth in the trie.
			node = node.children[word[i]];

			// finally, we check to see if it's the last word.
			if (i == word.length-1) {
				// if it is, we set the end flag to true.
				node.isEnd = true;
			}
		}
	}
  
	combine(word) {
		const wordCombo = [];
		let i = 0;
		while (i < word.length) {
			let duoTile = word.slice(i,i+2);
			if (duoTile == "st" || duoTile == "qu") {
				wordCombo.push(duoTile);
				i++;
			} else {
				wordCombo.push(word[i].toLowerCase());
			}
			i++;
		}
		return wordCombo;
    
	}
  
	buildTrieTree(words) {
		for (let i = 0; i < words.length; i++){
			var word = words[i].toLocaleLowerCase();
			if (words[i].includes("st") || words[i].includes("qu")) {
				word = this.combine(words[i]);
			}
			this.insert(word);
		}
	}
  
	isPrefix(chars){
		if (chars.includes("st") || chars.includes("qu"))
			chars = this.combine(chars);
		let treeNode = this.root;
		for (let i = 0; i < chars.length; i++) {
			if (!treeNode.children[chars[i]])
				return false;
			treeNode = treeNode.children[chars[i]];
		}
		return true;  
	}
  
	isWord(word) {
		if (word.includes("st") || word.includes("qu"))
			word = this.combine(word);
		let treeNode = this.root;
		for (let i = 0; i < word.length; i++) {
			if (!treeNode.children[word[i]])
				return false;
			treeNode = treeNode.children[word[i]];
		}
		return treeNode.isEnd; 
	}
}

function lowerCaseGrid(grid) {
	const lowerCaseGrid = [];
	for (let i = 0; i < grid.length; i++) {
		const lowerTiles = grid[i].map(tile => tile.toLowerCase());
		lowerCaseGrid.push(lowerTiles);
	}
	return lowerCaseGrid;
}

var wordSearch = function(row, col, grid, visited, trieTree, foundWord, solutionsSet) {
	const alterations = [[0,  1],
		[1,  0],
		[0, -1],
		[-1, 0],
		[1,  1],
		[-1,-1],
		[1, -1],
		[-1, 1]];
  
	// console.log(row, col, grid[row][col], visited);
	if (row < 0 || col < 0 ||
      row >= grid.length || col >= grid.length ||
      visited[row][col]) {
		return;
	}
  
	// build word for search
	foundWord += grid[row][col];
	//console.log(foundWord);
  
	//console.log(trieTree.isPrefix(foundWord));
	// see if word in trie (find method)
	if (trieTree.isPrefix(foundWord)) {
		//visited[row][col] = true;
		//console.log(visited);

		//if so check if word (contains method) and greater than 3
		if (trieTree.isWord(foundWord) && foundWord.length >= 3) {
			solutionsSet.add(foundWord);
		}
    
		for (let i = 0; i < 8; i++) {
			wordSearch(row + alterations[i][0], col + alterations[i][1], grid, visited, trieTree, foundWord, solutionsSet);
		}  
	}
	visited[row][col] = false;
};  

exports.findAllSolutions = function(grid, dictionary) {
	let solutions = new Set();
	if (grid.length != grid[0].length 
      || grid.length == 0 
      || dictionary.length == 0) {
		return [];
	}
  
	var dictTrie = new TrieTree();
	dictTrie.buildTrieTree(dictionary);
  
	// let is locally scoped and var is globally scoped
	let l = grid.length;
	grid = lowerCaseGrid(grid);

	for (let i = 0; i < l; i++) {
		if (grid[i].length != l) {
			return []; 
		}
		for (let j = 0; j < l; j++) {
			let foundStr = "";
			let visited = new Array(l).fill(new Array(l).fill(false));
			wordSearch(i, j, grid , visited, dictTrie, foundStr, solutions);
		}
	}
	return Array.from(solutions);
};


var grid = [["T", "W", "Y", "R"],
	["E", "N", "P", "H"],
	["G", "Z", "Qu", "R"],
	["St", "N", "T", "A"]];
var dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
	"pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
	"ten", "went", "wet", "arty", "egg", "not", "quar"];

console.log(exports.findAllSolutions(grid, dictionary));
