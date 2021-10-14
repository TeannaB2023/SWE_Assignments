const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** 
 * Author: Teanna Barrett @02924893
 * Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe('Boggle Solver tests suite:', () => {
  test('Normal input', () => {
    // This test covers finds valid words, recurse on the diagonal, non-adjacent letters
    let grid = [['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']];
    let dictionary = ['ABEF', 'AFJIEB', 'DGKD', 'DGKA'];
    let expected = ['ABEF', 'AFJIEB', 'DGKD'];
    
    let solutions = boggle_solver.findAllSolutions(grid, dictionary);
    
    lowercaseStringArray(expected);
    
    expect(solutions.sort()).toEqual(expected);
  });

  
  describe('Problem contraints', () => {
    test('Grid with Qu', () => {
      let grid = [['T', 'W', 'Y', 'R'],
                  ['E', 'N', 'P', 'H'],
                  ['G', 'A', 'Qu', 'R'],
                  ['O', 'E', 'B', 'E']];
      let dictionary = ['ten','querbe', 'qerbe', 'aqu', 'uqe'];
      let expected = ['aqu','querbe', 'ten'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      expect(solutions.sort()).toEqual(expected);
    });
    
    test('Grid with St', () => {
      let grid = [['T', 'W', 'Y', 'R'],
                  ['E', 'N', 'P', 'H'],
                  ['I', 'St', 'Qu','T'],
                  ['F', 'R', 'A', 'R']];
      let dictionary = ['start', 'sat', 'went', 'first', 'sass'];
      let expected = ['first','start', 'went'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      expect(solutions.sort()).toEqual(expected);
    });
  });

  
  describe('Input edge cases', () => {

    // Example Test using Jest
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutions, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    test('Grid is empty', () => {
      let grid = [];
      let dictionary = ['aba', 'bcc'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      expect(solutions).toEqual(expected);
    });
    
    test('Grid is jagged', () => {
      let grid = [['A', 'B', 'C'],
                   ['H', 'J'],
                   ['F', 'Z', 'O', 'U']];
      let dictionary = ['abc', 'zjhf', 'uuu'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      expect(solutions).toEqual(expected);
    });
    
    test('< 3 word length', () => {
      let grid = [['H', 'B', 'C'],
                   ['I', 'O', 'H'],
                   ['Y', 'Z', 'O']];
      let dictionary = ['hi', 'bo', 'yo'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      expect(solutions).toEqual(expected);
    });
    
    test('Repeated letters', () => {
      let grid = [['A', 'T', 'Y', 'R'],
                  ['F', 'A', 'G', 'O'],
                  ['I', 'A', 'Qu','B'],
                  ['F', 'R', 'A', 'R']];
      let dictionary = ['aaa', 'obo', 'go', 'fifty'];
      let expected = ['aaa', 'fifty'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      expect(solutions.sort()).toEqual(expected);
    });
  });
});