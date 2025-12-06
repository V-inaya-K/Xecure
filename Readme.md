Xecure : Shield against AI-manipulated images

Steps to run:
1.  Clone repo using "git clone" on your system
2.  Open 3 terminal windows in VS Code or any preffered runtime
3.  1st Terminal:<br>
    cd ROOT_FOLDER"<br>
    uvicorn main:app --reload --port 8000<br>

5.  2nd Terminal:<br>
cd backend<br>
npm init -y<br>
npm install express cors body-parser axios mongoose<br>
node app.js<br>

5.  3rd Terminal:<br>
    cd frontend<br>
    npm install<br>
    npm install -D tailwindcss postcss autoprefixer vite @vitejs/plugin-react<br>
    npx tailwindcss init -p<br>
    npm run dev<br>
