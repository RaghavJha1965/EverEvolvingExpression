# MongoDB & Admin Panel Setup

## 1. MongoDB Setup

### Create a MongoDB Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) or use a local MongoDB instance
2. Create a new database
3. Get your connection string

### Environment Variables
Create a `.env.local` file in the root directory with:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name?retryWrites=true&w=majority

# NextAuth Configuration (for future admin authentication)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## 2. Database Models

The application includes three main models:

### User Model
- Stores blog subscriber information
- Fields: name, email, createdAt, hasAccess

### Blog Model
- Stores blog articles
- Fields: title, subtitle, description, sections[], image, bgColor, isPublished, createdAt, updatedAt

### Retreat Model
- Stores retreat offerings
- Fields: label, title, price, description, bgColor, isActive, createdAt, updatedAt

## 3. API Endpoints

### Users
- `POST /api/users` - Create new user (blog signup)
- `GET /api/users` - Get all users (admin only)

### Blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs` - Get published blogs

### Retreats
- `POST /api/retreats` - Create new retreat
- `GET /api/retreats` - Get active retreats

## 4. Admin Panel

Access the admin panel at `/admin`

### Features:
- **Dashboard**: Overview of users, blogs, and retreats
- **User Management**: View and manage blog subscribers
- **Blog Management**: Create, edit, and publish blog articles
- **Retreat Management**: Manage retreat offerings and pricing

## 5. Current Status

✅ **Completed:**
- MongoDB connection setup
- Database models
- API routes
- Basic admin panel structure
- User signup integration

🔄 **Next Steps:**
- Implement full admin panel functionality
- Add authentication for admin access
- Create forms for adding/editing blogs and retreats
- Add data visualization and analytics

## 6. Usage

1. Set up MongoDB and environment variables
2. Run the development server: `npm run dev`
3. Access the website at `http://localhost:3000`
4. Access admin panel at `http://localhost:3000/admin`
5. When users sign up for blog access, their data is stored in MongoDB

## 7. Security Notes

- Add authentication to admin panel before production
- Implement rate limiting for API endpoints
- Add input validation and sanitization
- Consider adding CSRF protection 