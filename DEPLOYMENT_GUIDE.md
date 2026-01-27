# 🚀 Deployment Guide

Complete guide for deploying your professional Egg Boiling Timer to production.

## 📦 Pre-Deployment Checklist

- [ ] All features tested locally (timer, animations, audio, stats)
- [ ] Backend API verified (http://localhost:5000/api/stats)
- [ ] Frontend production build created (`npm run build`)
- [ ] Environment variables configured
- [ ] Database setup ready (if using MongoDB)
- [ ] Domains/SSL certificates configured

## 🌐 Frontend Deployment Options

### Option 1: Vercel (Recommended for React/Vite)

**Easiest deployment with automatic builds and CDN**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Frontend**
```bash
cd egg
vercel
```

3. **Configure Environment Variables**
In Vercel dashboard, set:
```
VITE_API_URL=https://your-api.com
```

4. **Update Frontend**
In `src/hooks/useEggTimer.js`, update API_URL:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Benefits:**
- Automatic deployments on git push
- Global CDN for fast loading
- Free tier available
- SSL included

### Option 2: Netlify

**Another excellent option for static React apps**

1. **Build the project**
```bash
cd egg
npm run build
```

2. **Deploy**
- Drag and drop the `dist` folder to Netlify
- Or connect GitHub for automatic deployments

3. **Configure Build Settings**
```
Build command: npm run build
Publish directory: dist
```

### Option 3: GitHub Pages

**Free option for static content**

1. **Update vite.config.js**
```javascript
export default {
  base: '/egg-timer/',
  // ... rest of config
}
```

2. **Build**
```bash
npm run build
```

3. **Deploy to GitHub**
```bash
git add dist
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Option 4: Traditional Hosting (cPanel, etc.)

1. **Build**
```bash
npm run build
```

2. **Upload Contents**
Upload all files from `egg/dist/` to your `public_html` directory

3. **Configure .htaccess** (for Apache)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔧 Backend Deployment Options

### Option 1: Heroku (Easiest for Node.js)

**Free tier available, good for small projects**

1. **Create Heroku Account**
Visit https://heroku.com and sign up

2. **Install Heroku CLI**
```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

3. **Login and Deploy**
```bash
cd backend
heroku login
heroku create egg-timer-api
git push heroku main
```

4. **View Logs**
```bash
heroku logs --tail
```

5. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=mongodb+srv://...
```

### Option 2: DigitalOcean App Platform

**$5/month droplet, more control than Heroku**

1. **Create DigitalOcean Account**
Visit https://digitalocean.com

2. **Create App**
- Connect GitHub repository
- Select `backend` directory
- Set HTTP port to 5000

3. **Configure Environment**
```
PORT=5000
NODE_ENV=production
```

4. **Deploy**
- Push to GitHub, automatic deployment triggers

### Option 3: AWS EC2

**More control, pay-as-you-go pricing**

1. **Launch EC2 Instance**
- Select Ubuntu 22.04 LTS
- t3.micro for free tier eligible

2. **Connect and Setup**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and install
git clone your-repo-url
cd backend
npm install
npm start
```

3. **Setup with PM2 (Process Manager)**
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

4. **Configure Security Group**
- Allow inbound on port 5000 (from frontend origin)
- Allow inbound on port 22 (SSH, restrict by IP)
- Allow outbound on port 443 (for HTTPS)

### Option 4: Docker (Recommended for scalability)

**Create containerized version for any platform**

1. **Create Dockerfile** in `backend/` directory:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]
```

2. **Create .dockerignore**
```
node_modules
npm-debug.log
.env.local
.git
```

3. **Build and Run Locally**
```bash
docker build -t egg-timer-backend .
docker run -p 5000:5000 egg-timer-backend
```

4. **Deploy to Docker Hub**
```bash
docker login
docker tag egg-timer-backend username/egg-timer-backend
docker push username/egg-timer-backend
```

5. **Deploy to Kubernetes/Docker Swarm**
Use the image from Docker Hub for cloud deployment

## 🗄️ Database Setup

### MongoDB Atlas (Cloud Database - Recommended)

1. **Create Account**
https://www.mongodb.com/cloud/atlas

2. **Create Cluster**
- Select free tier
- Choose region closest to users
- Create database user

3. **Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/eggdb
```

4. **Update backend** `.env` file
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/eggdb
```

5. **Update routes** to use MongoDB
Replace in-memory storage with:
```javascript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db('eggdb');
const sessions = db.collection('sessions');
const stats = db.collection('stats');
```

### MySQL/PostgreSQL (Traditional Database)

1. **Install Driver**
```bash
npm install pg
# or
npm install mysql2
```

2. **Create Database**
```sql
CREATE DATABASE egg_timer;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  level VARCHAR(20),
  duration INT,
  completed BOOLEAN,
  startTime TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stats (
  id SERIAL PRIMARY KEY,
  totalTimers INT DEFAULT 0,
  completedTimers INT DEFAULT 0,
  softCount INT DEFAULT 0,
  mediumCount INT DEFAULT 0,
  hardCount INT DEFAULT 0
);
```

3. **Configure Connection**
Update `backend/routes/` files to use database queries

## 🔐 Security Checklist

- [ ] Enable HTTPS/SSL certificate
- [ ] Set secure CORS headers
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting on API
- [ ] Set secure headers (helmet.js)
- [ ] Validate all input
- [ ] Use HTTPS for all external API calls
- [ ] Keep dependencies updated
- [ ] Monitor for vulnerabilities

**Install Helmet for security headers:**
```bash
npm install helmet
```

Add to `server.js`:
```javascript
import helmet from 'helmet';
app.use(helmet());
```

## 📊 Monitoring & Logging

### Setup Error Monitoring

**Using Sentry (Free tier available)**
```bash
npm install @sentry/node
```

Add to `server.js`:
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});
```

### View Logs

**Heroku**
```bash
heroku logs --tail
```

**DigitalOcean**
Dashboard → Apps → Logs tab

**AWS**
CloudWatch → Logs groups

## ✅ Post-Deployment Verification

1. **Test Frontend**
```bash
# Verify all routes work
curl https://your-frontend-domain
curl https://your-frontend-domain/#/stats
```

2. **Test API**
```bash
curl https://your-api-domain/api/stats
curl https://your-api-domain/api/stats/completion-rate
```

3. **Test CORS**
- Open DevTools Console
- Verify no CORS errors
- Check Network tab for API calls

4. **Performance Check**
- Use Lighthouse in Chrome DevTools
- Target: 90+ score
- Check load times

5. **Mobile Testing**
- Test on actual mobile devices
- Check responsive design
- Verify touch interactions

## 🚨 Troubleshooting Deployment

### "CORS Error" in Console
**Solution:** Update CORS in backend
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain',
  credentials: true
}));
```

### "Cannot find module" Error
**Solution:** Install dependencies
```bash
npm install
# or
npm ci
```

### Port Already in Use
**Solution:** Change port in `.env`
```env
PORT=5001
```

### Database Connection Failed
**Solution:** Check connection string
```bash
# Test connection
mongosh "your-connection-string"
```

## 🔄 Continuous Deployment

**Automatic deployment on git push**

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - run: npm run deploy
```

## 📈 Scaling

**As your app grows:**

1. **Frontend Scaling**
   - Using CDN (Vercel, Netlify do this automatically)
   - Enable caching headers

2. **Backend Scaling**
   - Horizontal scaling (multiple instances)
   - Load balancing (nginx, AWS ELB)
   - Database optimization (indexing, caching)
   - Use Redis for caching

3. **Performance Optimization**
   - Code minification (Vite does this)
   - Image optimization
   - Database query optimization
   - API response caching

## 📞 Support

For deployment questions:
- Check platform-specific documentation
- Review logs for error messages
- Test locally first before deploying
- Use monitoring tools to track issues

---

**Happy Deployments!** 🚀
