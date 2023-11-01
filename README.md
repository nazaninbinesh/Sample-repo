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

# A brief explanation of design and architectural choices, and challenges I encountered
- React: React is chosen as the front-end library.
- TypeScript: TypeScript is used to add static typing to JavaScript.
- Component-based Architecture: Components are designed to be reusable and self-contained, which promotes a modular and scalable application structure.
- Routing: Routing has been implemented to enable seamless navigation between different pages (components) of the application.
- Styling: The project uses Tailwind CSS for styling. 

# Challenges Encountered:
- Learning Curve: Learning TypeScript, including understanding type annotations and interfaces, was challenging, whereas adopting Tailwind CSS was relatively easy.
- Dealing with a 100K-row data, which took time to process. I identified potential solutions, such as reading the data in chunks and implementing pagination. Additionally, I considered handling this large dataset on the back-end to pass the front-end clean and lightweight data.

# If applicable, a list of any additional libraries or frameworks used.
- papaparse library installed but not used. It is recommended for parsing CSV to JSON due to its efficiency and ease of use.
- react-router-dom : to  provides routing capabilities for React applications.


# Important 
 - A lightweight CSV file is included for testing purposes into the root of repository called "lightweight-sample.csv".



# Lessons Learned
- Reading Heavy Files
From the outset, I should have focused on efficiently handling large files with 100k rows by implementing chunk-wise reading. While the current implementation works well for light .csv files, it tends to cause browser crashes when dealing with heavy files.

- TypeScript Usage
It's crucial to use TypeScript consistently throughout the project, especially since the files are in the .ts format. Avoid using the "any" type for variables to prevent potential errors.

- Unfinished API Call
I initially planned to make an API call to GitHub repositories with the same username, but I didn't complete this feature. I spent some time learning how to perform an API call on GitHub and successfully implemented it using Octokit.

