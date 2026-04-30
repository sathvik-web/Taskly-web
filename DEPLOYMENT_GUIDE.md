# Deployment Guide

Deploy your User Dashboard App to the internet so others can use it!

---

## 🚀 Backend Deployment

### Option 1: Deploy to Railway (Easiest)

Railway handles everything - databases, hosting, deployment.

#### Step 1: Prepare Backend

1. Ensure `backend/` folder has:
   - `package.json`
   - `src/server.js`
   - `prisma/schema.prisma`
   - `.env` (but add to .gitignore)

2. Add to `package.json` scripts:
```json
"scripts": {
  "dev": "node src/server.js",
  "start": "node src/server.js"
}
```

#### Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

#### Step 3: Add Database

1. In Railway dashboard, click "+ Add"
2. Select "PostgreSQL"
3. Railway creates database automatically

#### Step 4: Add Backend Service

1. Click "+ Add" → "GitHub Repo"
2. Select your repo
3. Set Root Directory: `backend`
4. Add environment variables:
   - `NODE_ENV`: production
   - `JWT_SECRET`: your-secret-key
   - `PORT`: 5000
5. Railway auto-connects DATABASE_URL

#### Step 5: Deploy

1. Railway auto-deploys when you push to GitHub
2. You get a URL like: `https://backend-prod.railway.app`
3. Copy this URL for frontend configuration

### Option 2: Deploy to Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add PostgreSQL addon: `heroku addons:create heroku-postgresql:hobby-dev`
5. Set environment variables: `heroku config:set JWT_SECRET=your-secret`
6. Deploy: `git push heroku main`

### Option 3: Deploy to DigitalOcean

1. Create Droplet (Ubuntu 22.04)
2. SSH into droplet
3. Install Node.js and PostgreSQL
4. Git clone your repo
5. Run `npm install` in backend folder
6. Set up environment variables
7. Use PM2 or systemd to keep app running
8. Set up Nginx as reverse proxy

---

## 🌐 Frontend Deployment

### Option 1: Deploy to Vercel (Easiest for React)

Vercel is optimized for Vite and React.

#### Step 1: Prepare Frontend

1. Create `.env.production`:
```
VITE_API_URL=https://your-backend-url.com/api
```

2. Test production build locally:
```bash
npm run build
npm run preview
```

#### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"

#### Step 3: Configure

1. Select your repo
2. Select root directory: `frontend`
3. Add environment variable:
   - `VITE_API_URL`: your production backend URL
4. Click Deploy

#### Step 4: Done!

Vercel gives you a URL like: `https://your-app.vercel.app`

### Option 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select your repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variable: `VITE_API_URL`
7. Deploy!

### Option 3: Deploy to GitHub Pages

1. Update `vite.config.js`:
```javascript
export default {
  base: '/repository-name/',
  // ... rest of config
}
```

2. Build: `npm run build`

3. Push `dist/` folder to GitHub

4. Enable Pages in repo settings

---

## 🔗 Connect Frontend to Backend

After deploying both:

1. **Get your backend URL** from Railway/Heroku/etc
2. **Update frontend `.env` or in Vercel settings:**
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
3. **Redeploy frontend**

---

## 🔐 Production Checklist

### Backend

- [ ] `JWT_SECRET` is a strong random string (not "your_secret_key")
- [ ] `DATABASE_URL` points to production PostgreSQL
- [ ] `.env` is NOT in version control (add to .gitignore)
- [ ] `NODE_ENV=production` is set
- [ ] CORS allowed for frontend domain
- [ ] Password validation is strict (min 8 chars, etc)
- [ ] Error messages don't expose database details
- [ ] Rate limiting is set up (prevent brute force)

### Frontend

- [ ] `VITE_API_URL` points to production backend
- [ ] Remove console.log debug statements
- [ ] Test all features before deploying
- [ ] Check that token refresh works
- [ ] Verify HTTPS is enforced
- [ ] Test on mobile devices

---

## 🚨 Common Issues

### CORS Error

**Problem:** Frontend can't reach backend
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Update backend `server.js`:
```javascript
app.use(cors({
  origin: "https://your-frontend-url.com",
  credentials: true,
}))
```

### Token Issues

**Problem:** Get "Invalid token" after login
- JWT_SECRET changed between deployment and local testing
- Make sure same JWT_SECRET is used everywhere

**Solution:**
```javascript
// Make sure this is set in production
process.env.JWT_SECRET // should match what's in environment variables
```

### Database Connection Failed

**Problem:** Backend can't connect to PostgreSQL
```
P1000: Can't reach database server
```

**Solution:**
- Verify DATABASE_URL is correct
- Check if database is running
- Make sure firewall allows connections
- Test connection in local environment first

### "Cannot find module" error

```
npm install
```

### Build fails on Vercel/Railway

1. Check build logs
2. Make sure `package.json` exists in root or specified folder
3. Verify node version is 16+
4. Try running `npm run build` locally first

---

## 📊 Monitoring

### Check Backend Logs

**Railway:** Dashboard → Deployments → View Logs
**Heroku:** `heroku logs --tail`
**DigitalOcean:** `pm2 logs`

### Monitor Performance

- Add monitoring dashboard (Datadog, New Relic, etc)
- Set up error tracking (Sentry)
- Monitor database query performance

---

## 💰 Cost

### Free Tier Options

- **Railway**: $5/month free credit (great for getting started)
- **Vercel**: Free for frontend
- **Netlify**: Free for frontend
- **Heroku**: $7+/month (moved away from free tier)
- **DigitalOcean**: $4/month (cheapest VPS)
- **PostgreSQL**: Free tier available on most platforms

### Estimate for Small Project

- Frontend: Free (Vercel/Netlify)
- Backend: $5-15/month (Railway/Heroku/DO)
- Database: Free-$15/month depending on data

**Total: $5-30/month for a small project**

---

## 🔄 Continuous Deployment

All these platforms auto-deploy when you push to GitHub:

1. You commit and push code
2. GitHub triggers deployment
3. Service auto-builds and deploys
4. New version is live (usually in 1-5 minutes)

---

## 🎓 Next Level Deployments

- Add CI/CD pipeline (GitHub Actions)
- Add automated testing
- Add load balancing
- Add CDN for static files
- Set up automated backups
- Add SSL certificate (automatic on Railway/Vercel)
- Add security headers
- Set up API rate limiting

---

## 📚 Helpful Resources

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-deployment.html)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**Good luck deploying!** 🚀
