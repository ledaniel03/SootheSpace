# SootheSpace: Simply Serene
SootheSpace is your personal retreat for managing stress, anxiety, and low moods. Through equipping you with digital mood tracking features, SootheSpace will then introduce clinically proven strategies from cognitive behavioral therapy. Designed to be simple & accessible yet effective, SootheSpace aims to enhance your mental wellbeing so that you can face each day with a more positive outlook. 

**Link to project:** [http://recruiters-love-seeing-live-demos.com/](https://soothespace.netlify.app/) **(Frontend may not be hosted or still connected to the backend when this is viewed)**

## How It's Made:

![System Architecture](https://github.com/ledaniel03/SootheSpace/assets/60050273/7e14d679-f23a-4afc-bc60-0bbc117f6c70)

## Frontend: 
**Documentation:** [Frontend_Documentations.pdf](https://github.com/ledaniel03/SootheSpace/files/15287828/Frontend_Documentations.pdf)

**Tech used:** Typescript, React, Vite.js, Tailwind CSS, DaisyUI, Chart.js 
### Component Architecture:
The project's frontend architecture consists of:
- **soothespace-frontend** the root directory which holds the entire project's frontend
- **index.tsx** the entry point for our React Application
- **App.tsx** represents the root component of our React Application & handles our wegpages routing
- **pages** directory which is used for our web pages
- **components** directory containing shared/reused components across many pages
- **hooks** directory containing hooks which encapsulate commonly used behaviors across components or pages
- **utils** directory containing typescript files for conversions & our backend integration
- **assets** this directory is used to store static assets such as images, icons, fonts, and sometimes CSS files that are used across the application

## Backend:
**Documentation:** 
**Tech used:** Django, Python, Django Rest Framework (for GET requests), SQLite, & OpenAI API 
### Component Architecture:
The project's frontend architecture consists of:
- **soothespace_backend** the root directory which holds the entire project's backend.
- **accounts** App that manages all backend processes related to user registration, authentication, and profile management in Django. It securely handles user data, authentication tokens, and interacts with the database to store and retrieve user-specific information, ensuring robust security and data integrity.
- **chat** The chat App is responsible for handling all data transmission and storage for real-time and asynchronous messaging. It manages message queues, stores chat history, utilizes OpenAi's API, customizes the AI to act as a mental health companion, & ensures data consistency across user sessions, facilitating a seamless communication experience.
- **user_settings** User settings provides a backend service for managing user password and profile settings. It interfaces with the database to save user-configured settings such as password login & profile picture, allowing for a personalized user experience.
- **journal**- The journal App on the Django backend serves as a secure repository for users’ journal entries, handling storage, retrieval, & deletion. It ensures data privacy and utilizes REST APIs for accessing and managing journal entries.


## Deployment & Installation Guide:
To run this project locally, download the project here:
https://github.com/ledaniel03/SootheSpace

### How to Install
**Backend Dependencies**
Download the dependencies in the requirement.txt file by- 
1. Activate your Python virtual environment (if you are using one).
2. Ensure you're in the directory (root) where the requirements.txt file is located.
3. Run the following command:
   **pip install -r requirements.txt**

**Frontend Dependencies**
1. cd into the soothespace-frontend directory
2. In your project's terminal run the command:
   **npm vite install**

**Now that that's done, we can host the project locally!**

### How to Host Locally
**Backend Local Hosting**
1. cd into the soothespace_backend directory (where manage.py is)
2. run the following command:
   **py manage.py runserver**
3. Go to the host website provided (urls can be viewed in the project url's file, followed by each app's url's file)

**Frontend Local Hosting**
1. cd into the soothespace-frontend directory
2. Run the following command:
  **npm run dev**
3. In the frontend directory navigate to the utils folder > db.tsx > and **modify** the BASE_URL to the base URL you're running the backend on (should be http://127.0.0.1:8000)


### Testing on local network (other devices)
**Frontend:** https://dev.to/bhendi/how-to-open-your-vite-dev-server-on-your-mobile-k1k
**Backend:** https://dev.to/emilledigital/serve-your-django-application-over-wifi-the-local-network-1a01
(**note:** In the frontend directory navigate to the utils folder > db.tsx > and modify the BASE_URL to the base URL you're running the backend on (omit any "/" after)

### Deploying Backend on PythonAnywhere:
This can be done with any hosting service supporting Django & SQLite. In this guide, we'll be using PythonAnywhere as it's free-
**Refer to the following links for a step by step guide on deployment**
https://help.pythonanywhere.com/pages/DeployExistingDjangoProject/
_or_
https://www.youtube.com/watch?v=xtnUwvjOThg&t=227s

### Deploying Frontend on Netlify:
This can be done with any compatible frontend hosting service. In this guide, we'll be using netlify as it's free-
**Refer to the following links for a step by step guide on deployment**
https://docs.netlify.com/frameworks/vite/
_or_
https://youtu.be/XMGOfJxnH7s?si=NhBTRwoqJFEc_enB

## Assets & References Used:
- **OpenAI API:** https://platform.openai.com/docs/quickstart 
- **React Structure Guide:** https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
- **Sounds used:**
  - https://www.youtube.com/watch?v=ETdAlFuJ9PE&ab_channel=FosteringResilience
  - https://www.youtube.com/watch?v=NACJwvt1dHI&ab_channel=SonoLumin
  - https://www.youtube.com/watch?v=933iGRsKdao&ab_channel=SerenitySeekers

## Project Recordings
**Teaser**
https://github.com/ledaniel03/SootheSpace/assets/60050273/dad64a8c-d5df-4319-bc56-464166586c9f

**Demo**
https://drive.google.com/file/d/1xIfL0SR9jFMIFVpwVWJuK81UL8jZMrXp/view?usp=sharing
