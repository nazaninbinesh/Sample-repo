# Project Name
- Sample-repo

# Instructions on how to run your application.
# Prerequisites
- Make sure you have the following software installed on your system:
    - Node.js (https://nodejs.org)
    - npm (Node Package Manager, typically installed with Node.js)

# Installation
- Clone this repository to your local machine:    
    - git clone https://github.com/nazaninbinesh/Sample-repo.git
- Navigate to the project directory:
    - cd Sample-repo
- Install the required dependencies:
    - npm install

# Running the Application
- To start the development server and run the application, use the following command:
    - npm run dev




# A brief explanation of your design and architectural choices, and any challenges you encountered
- React: React is chosen as the front-end library due to the company's requirement, its component-based architecture, and virtual DOM.
- TypeScript: TypeScript is used to add static typing to JavaScript, due to the company's requirement.
- Component-based Architecture: Components are designed to be reusable and self-contained, which promotes a modular and scalable application structure.
- Routing: Routing has been implemented to enable seamless navigation between different pages (components) of the application.
- Styling: The project uses Tailwind CSS for styling. 
- Refactoring: Integrating a component-based architecture and routing system meant significant changes to the codebase. We had to refactor existing code to adapt to the new structure and ensure that components were decoupled and easily maintainable.

# Challenges Encountered:
- Learning Curve: Learning TypeScript, including understanding type annotations and interfaces, was challenging, whereas adopting Tailwind CSS was relatively easy.
- Dealing with a 100K-row data, which took time to process. I identified potential solutions, such as reading the data in chunks and implementing pagination. Additionally, I considered handling this large dataset on the back-end to pass the front-end clean and lightweight data.
- One of the challenges was the time constraint. The assignment required 4 to 6 hours to complete, but due to my other commitments, I couldn't dedicate more time to it, resulting in incomplete submission.

# If applicable, a list of any additional libraries or frameworks used.
- papaparse library installed but not used. It is recommended for parsing CSV to JSON due to its efficiency and ease of use.
- react-router-dom : to  provides routing capabilities for React applications.


# Important 
 - A lightweight CSV file is included for testing purposes.
 
