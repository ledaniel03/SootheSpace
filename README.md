# SootheSpace: Simply Serene
SootheSpace is your personal retreat for managing stress, anxiety, and low moods. Through equipping you with digital mood tracking features, SootheSpace will then introduce clinically proven strategies from cognitive behavioral therapy. Designed to be simple & accessible yet effective, SootheSpace aims to enhance your mental wellbeing so that you can face each day with a more positive outlook. 

**Link to project:** [http://recruiters-love-seeing-live-demos.com/](https://soothespace.netlify.app/) **(Frontend may not be hosted or still connected to the backend when this is viewed)**

## How It's Made:
**Tech used:** Typescript, React, Tailwind CSS, DaisyUI, Vite.js, Chart.js Django, Python, Django Rest Framework (for GET requests), SQLite, & OpenAI API 

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


To test the website on your mobile or external devices, refer to the following guides:
**Frontend:** https://dev.to/bhendi/how-to-open-your-vite-dev-server-on-your-mobile-k1k
**Backend:** https://dev.to/emilledigital/serve-your-django-application-over-wifi-the-local-network-1a01
(**note:** In the frontend directory navigate to the utils folder > db.tsx > and modify the BASE_URL to the base URL you're running the backend on (omit any "/" after)


React Structure Guide:
https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
