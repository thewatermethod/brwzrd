import React from "react";

const About = () => {
  return (
    <main>
      <h1 className="page-title">About this site</h1>
      <p>
        <a href="https://github.com/thewatermethod/brwzrd">
          Browse the code on Github
        </a>
      </p>
      <ul>
        <li>This site was created with "create-react-app."</li>
        <li>I used Typescript and GraphQL.</li>
        <li>Brews are stored on Fauna DB.</li>
        <li>The backend/api runs on serverless node functions.</li>
        <li>Netlify makes all this possible!</li>
      </ul>
    </main>
  );
};

export default About;
