# Portfolio Application Deployment Guide

This guide explains how to set up and run your portfolio application in both local development and production environments.

## 🌍 Environment Configuration

### Production URLs
- **Frontend**: https://www.hus-nain.dev/
- **Backend**: https://portfolio-production-fbd0.up.railway.app

### Local Development URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Set Up Environment Variables
```bash
npm run setup-env
```

This will create the following files:
- `frontend/.env.local` - Frontend local development config
- `frontend/.env.production` - Frontend production config
- `backend/.env` - Backend local development config
- `backend/.env.production` - Backend production config

### 3. Configure Your Environment Variables

#### Backend Environment Variables
Update `backend/.env` with your actual values:

```env
# Database
MONGO_URI=mongodb://localhost:27017/portfolio

# Server Configuration
PORT=5001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASS=your_actual_app_password
EMAIL_RECIPIENT=your_actual_email@gmail.com

# JWT Secret
JWT_SECRET=your_actual_jwt_secret_key_here
```

#### Frontend Environment Variables
The frontend `.env.local` should be:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## 🏃‍♂️ Running the Application

### Local Development

#### Option 1: Run Both Services Together
```bash
npm run dev-all
```

#### Option 2: Run Services Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Production

#### Backend (Railway)
Your backend is already deployed to Railway. Make sure to set these environment variables in your Railway dashboard:

```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
FRONTEND_URL=https://www.hus-nain.dev
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_RECIPIENT=your_email@gmail.com
JWT_SECRET=your_jwt_secret_key_here
```

#### Frontend (Vercel)
Your frontend is deployed to Vercel. Set this environment variable in your Vercel dashboard:

```env
NEXT_PUBLIC_API_URL=https://portfolio-production-fbd0.up.railway.app
```

## 🔧 Configuration Details

### CORS Configuration
The backend is configured to allow requests from:
- **Development**: `http://localhost:3000`, `http://localhost:3001`
- **Production**: `https://www.hus-nain.dev`, `https://hus-nain.dev`

### API Endpoints
All API endpoints are available at:
- **Local**: `http://localhost:5001/api`
- **Production**: `https://portfolio-production-fbd0.up.railway.app/api`

Available endpoints:
- `GET/POST /api/auth` - Authentication
- `GET/POST/PUT/DELETE /api/projects` - Project management
- `GET/POST/PUT/DELETE /api/skills` - Skills management
- `GET/PUT /api/profile` - Profile management
- `POST /api/contact` - Contact form

## 📝 Environment Variable Checklist

### Required for Backend
- [ ] `MONGO_URI` - Database connection string
- [ ] `JWT_SECRET` - Secret for JWT tokens
- [ ] `CLOUDINARY_CLOUD_NAME` - For image uploads
- [ ] `CLOUDINARY_API_KEY` - For image uploads
- [ ] `CLOUDINARY_API_SECRET` - For image uploads
- [ ] `EMAIL_USER` - For contact form emails
- [ ] `EMAIL_PASS` - For contact form emails
- [ ] `EMAIL_RECIPIENT` - Where to send contact form emails

### Required for Frontend
- [ ] `NEXT_PUBLIC_API_URL` - Backend API URL

## 🚦 Testing Your Setup

### Local Development
1. Start both services: `npm run dev-all`
2. Open http://localhost:3000 in your browser
3. Check that projects and skills load correctly
4. Test the admin panel at http://localhost:3000/admin
5. Test the contact form

### Production
1. Visit https://www.hus-nain.dev/
2. Check that all data loads correctly
3. Test the admin panel at https://www.hus-nain.dev/admin
4. Test the contact form functionality

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use strong, unique passwords for all services
- Keep your JWT secret secure and complex
- Use environment-specific database URIs
- Enable 2FA on all your hosting accounts

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Check that your frontend URL is added to the backend CORS configuration
2. **API Not Found**: Verify the `NEXT_PUBLIC_API_URL` is correct
3. **Database Connection**: Ensure MongoDB is running locally or the production URI is correct
4. **Image Upload Issues**: Check Cloudinary credentials
5. **Email Not Sending**: Verify email credentials and app passwords

### Checking Environment Variables
```bash
# Backend
cd backend
node -e "console.log(process.env.MONGO_URI)"

# Frontend (during build)
cd frontend
npm run build
```

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all services are running
4. Check the network tab for failed API requests

Happy deploying! 🎉 