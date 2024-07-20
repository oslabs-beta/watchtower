import 'jest';
import '@types/jest';
// The plan is to perform some testing for the following:
// 1. Unit Testing
// 2. React Component Testing
// 3. Endpoint Testing (Express / MongoDB)
// 4. AI Testing? (Research if this is viable or industry standard at all)

// Create a sample test to ensure Jest Configuration is valid

// test('testing that jest is functioning', () => {
//   expect(2 + 2).toEqual(4);
// });

describe('Very first test', () => {
  it('A test', () => {
    const hello = () => {
      'helloWorld';
    };
    // Testing that hello function actually returns string helloWorld
    expect(hello()).toBe('helloWorld');
  });
});
