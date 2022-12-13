/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

/* eslint-env es6 */
/* eslint-disable no-console */

exports.findAllSolutions = function (grid, dictionary) {
  const solutions = []

  return solutions
}

exports.findAllSolutions = function (grid, dictionary) {
  const SolutionsSet = new Set()
  let solutions = []

  if (grid == null || dictionary == null) { // checks of grid or dict is empty
    return solutions
  }

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length !== grid.length) {
      return solutions
    }
  }

  convertToLowerCase(grid, dictionary)
  const trie = new Set(dictionary)

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      const visited =
      new Array(grid.length).fill(false).map(() =>
        new Array(grid.length).fill(false))
      const word = []// is empty to start
      findWords(word, grid, trie, x, y, visited, SolutionsSet)
    }
  }
  solutions = Array.from(SolutionsSet)
  return solutions
}

function findWords (word, grid, trie, y, x, visited, SolutionsSet) {
  // this is the recursive call
  const AdjacentLookup = [[-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]]

  if (y < 0 || y >= grid.length || x < 0 ||
   x >= grid.length || visited[y][x] === true) {
    return
  }

  word += grid[y][x]

  if (isPrefix(trie, word)) {
    visited[y][x] = true

    if (isWord(trie, word)) {
      SolutionsSet.push(word)
    }

    for (let i = 0; i < 8; i++) {
      findWords(word, grid, trie, y + AdjacentLookup[i][0],
        x + AdjacentLookup[i][1], visited, SolutionsSet)
    }
  }

  visited[y][x] = false
}

function isPrefix (trie, word) {
  for (const tword of trie) {
    if (tword.substr(0, word.length) === word) {
      return true
    }
  }
  return false
}

function isWord (trie, word) {
  for (const tword of trie) {
    if (tword === word && word.length >= 3) {
      return true
    }
  }
  return false
}
function convertToLowerCase (grid, dictionary) {
  for (let x = 0; x < grid.length; x++) {
    for (let i = 0; i < grid[x].length; i++) {
      grid[x][i] = grid[x][i].toLowerCase()
    }
  }
  for (let x = 0; x < dictionary.length; x++) {
    dictionary[x] = dictionary[x].toLowerCase()
  }
}

const grid = [['t', 'w', 'y', 'r'],
  ['e', 'n', 'p', 'h'],
  ['g', 'z', 'qu', 'r'],
  ['o', 'n', 't', 'a']]
const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
  'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar']

console.log(exports.findAllSolutions(grid, dictionary))
