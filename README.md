##PROJECT TITLE
# AI Product Recommendation System

##DESCRIPTION
A full-stack product recommendation app with AI-based suggestions using category similarity. Users can register, login, browse products, and view recommendations.

##TECH STACK
- Frontend: Next.js, React, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- AI Logic: Category-based recommendations

##SETUP INSTRUCTIONS
Backend
cd backend
npm install
# Set up .env file with MongoDB URI and JWT secret
npm run dev

##Frontend
cd frontend
npm install
npm run dev

##AI APPROACH
- Recommendations are generated using category-based similarity (free local logic).

##FEATURES
User authentication (Signup/Login)
Product listing and details
AI-based recommendations
Admin dashboard for CRUD
Search bar on product listing

##AI STRUCTURE
ai-product-recommendation/
│
├─ backend/ # Backend server (Node.js + Express)
│ ├─ models/ # Mongoose models (Product, User)
│ ├─ routes/ # API routes
│ ├─ server.js # Main server entry
│ └─ package.json
│
├─ frontend/ # Frontend app (Next.js + TailwindCSS)
│ ├─ pages/ # Next.js pages
│ ├─ components/ # React components (ProductCard, AdminForm, etc.)
│ ├─ public/ # Static assets
│ └─ package.json
│
└─ README.md # Project documentation





