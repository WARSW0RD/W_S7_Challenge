import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

/*
  👉 TASK 1 - Unit Testing of sum function

  Test the following:
    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
*/


function sum(a, b) {
  a = Number(a);
  b = Number(b);
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers');
  }
  return a + b;
}


describe('tests for sum function', () => {
  it('should throw an error when no arguments are passed', () => {
    expect(() => sum()).toThrow('pass valid numbers');
  });

  it('should throw an error when one of the arguments is a string', () => {
    expect(() => sum(2, 'seven')).toThrow('pass valid numbers');
  });

  it('should return 4 when given 1 and 3', () => {
    expect(sum(1, 3)).toBe(4);
  });

  it('should return 3 when given "1" and 2', () => {
    expect(sum('1', 2)).toBe(3);
  });

  it('should return 13 when given "10" and "3"', () => {
    expect(sum('10', '3')).toBe(13);
  });
});

/*
  👉 TASK 2 - Integration Testing of HelloWorld component

  Test the <HelloWorld /> component...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM
*/

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  );
}


describe('tests for HelloWorld component', () => {
  it('renders a link that reads "Home"', () => {
    render(<HelloWorld />); 
    const homeLink = screen.queryByText('Home'); 
    expect(homeLink).toBeInTheDocument(); 
  });

  it('renders a link that reads "About"', () => {
    render(<HelloWorld />);
    const aboutLink = screen.queryByText('About');
    expect(aboutLink).toBeInTheDocument();
  });

  it('renders a link that reads "Blog"', () => {
    render(<HelloWorld />);
    const blogLink = screen.queryByText('Blog');
    expect(blogLink).toBeInTheDocument();
  });

  it('renders text that reads "The Truth"', () => {
    render(<HelloWorld />);
    const truthText = screen.queryByText('The Truth');
    expect(truthText).toBeInTheDocument();
  });

  it('renders text that reads "JavaScript is pretty awesome"', () => {
    render(<HelloWorld />);
    const jsText = screen.queryByText('JavaScript is pretty awesome');
    expect(jsText).toBeInTheDocument();
  });

  it('renders text that includes "JavaScript is pretty" (case-insensitive)', () => {
    render(<HelloWorld />);
    const jsText = screen.queryByText(/JavaScript is pretty/i); // regular expression for case-insensitive match
    expect(jsText).toBeInTheDocument();
  });
});
