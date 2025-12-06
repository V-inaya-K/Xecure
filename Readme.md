Xecure : Shield against AI-manipulated images

Steps to run:
1.  Clone repo using "git clone" on your system
2.  Open 3 terminal windows in VS Code or any preffered runtime
3.  1st Terminal:
> cd "ROOT_FOLDER"
> uvicorn main:app --reload --port 8000

4.  2nd Terminal:
> cd backend
> npm init -y
> npm install express cors body-parser axios mongoose
> node app.js

5.  3rd Terminal:
> cd frontend
> npm install
> npm install -D tailwindcss postcss autoprefixer vite @vitejs/plugin-react
> npx tailwindcss init -p
> npm run dev
