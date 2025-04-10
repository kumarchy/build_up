# BuildUp - A Social Platform for Developers
BuildUp is a full-stack social platform designed for developers to share their projects, collaborate, and interact with others. It allows users to post their projects, like/dislike posts, comment on them, and search for projects based on keywords or categories. The platform is built with React (frontend), Express.js (backend), Prisma (ORM), and PostgreSQL (database). It also integrates Cloudinary for image uploads and JWT for authentication.

## Features 
1. User Authentication:
   - Signup and login with email and password.
   - Password hashing using bcryptjs.
   - JWT-based authentication for secure access.
2. Project Management:
   - Users can create, update, and delete their projects.
   - Projects include details like title, description, tech stack, type, GitHub link, deployed link, and an image.
3. Interactions:
   - Like or dislike projects.
   - Comment on projects.
   - View the number of likes, dislikes, and comments on each project.
4. Search Functionality:
   - Search for projects by title or type.
   - Supports hashtags (e.g., #react, #nodejs).
5. Responsive Design:
   - Mobile-friendly and responsive UI.
6. Image Upload:
   - Upload project images using Cloudinary.
7. Real-time Updates:
   - Like/dislike and comment counts update in real-time.
## Tech Stack
### Frontend:
   - React (with React Router for navigation)
   - Tailwind CSS (for styling)
   - Lucide Icons (for icons)
   - Axios (for API requests)
### Backend:
   - Express.js (Node.js framework)
   - Prisma (ORM for PostgreSQL)
   - PostgreSQL (database)
   - Cloudinary (for image uploads)
   - JWT (for authentication)
   - Bcryptjs (for password hashing)
   - CORS (for cross-origin requests)

## Installation and Setup
### Prerequisites:
   - Node.js (v16 or higher)
   - PostgreSQL database
   - Cloudinary account (for image uploads)
   - Git (for version control)
### Steps:
1. Clone the Repository:
```
git clone https://github.com/your-username/build-up.git
cd build-up
```
2. Install Dependencies:
- For the backend:
```
cd backend
npm install
```
- For the frontend:
```
cd frontend
npm install
```
3. Set Up Environment Variables:
- Create a .env file in the backend directory and add the following:
```
PORT=3000
DATABASE_URL="postgresql://your-db-user:your-db-password@your-db-host:5432/your-db-name"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
JWT_SECRET="your-jwt-secret"
```
4. Set Up the Database:
- Run Prisma migrations:
```
npx prisma migrate dev --name init
```
5. Start the Backend Server:
```
npm start
```
6. Start the Frontend Server:
```
cd frontend
npm start
```
## API Endpoints 
### Authentication:
- POST /api/user/signup: Register a new user.
- POST /api/user/signin: Log in a user.
### Posts:
- GET /api/post: Fetch all posts.
- POST /api/post: Create a new post.
- DELETE /api/post/:id: Delete a post.
- GET /api/post/search: Search for posts by title or type.
### Comments:
- POST /api/comment: Add a comment to a post.
- GET /api/comment/:post_id: Fetch comments for a specific post.

### Likes:
- POST /api/like: Like or dislike a post.
- GET /api/like/:post_id: Fetch likes and dislikes for a post.
## Folder Structure
```
build-up/
├── backend/
│   ├── controllers/          # Controller logic
│   ├── db/                   # Database configuration
│   ├── routes/               # API routes
│   ├── prisma/               # Prisma schema and migrations
│   ├── .env                  # Environment variables
│   ├── index.js              # Entry point for the backend
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React context for state management
│   │   ├── pages/            # React pages
│   │   ├── App.js            # Main application component
│   │   └── index.js          # Entry point for the frontend
│   └── package.json          # Frontend dependencies
└── README.md                 # Project documentation
```
## Screenshots 
![image](https://github.com/kumarchy/build_up/blob/main/BuildUp.png?raw=true)

## Contributing 
Contributions are welcome! If you'd like to contribute, please follow these steps:
- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.
## Acknowledgments 
- Prisma for making database interactions seamless.
- Cloudinary for easy image uploads.
- Tailwind CSS for simplifying styling.
