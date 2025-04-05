# Deploying to Vercel

This guide will walk you through deploying your SEO AI Agents application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Git](https://git-scm.com/downloads) installed on your machine
3. Your GROQ API key

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Select "Other"
   - Root Directory: Leave as default (if your code is in the root)

### 3. Configure Environment Variables

1. In the Vercel project settings, go to the "Environment Variables" tab
2. Add the following variable:
   - Name: `GROQ_API_KEY`
   - Value: Your GROQ API key
3. Click "Save"

### 4. Deploy

1. Click "Deploy"
2. Wait for the deployment to complete

## Vercel Configuration

Your project already includes a `vercel.json` file configured to:
- Use `main_with_static.py` as the entry point
- Serve static files from the `static` directory
- Route all requests appropriately

## Troubleshooting

### API Key Issues

If you encounter errors related to the GROQ API, verify that:
- The environment variable is correctly set in Vercel
- The API key is valid and has the necessary permissions

### Static Files Not Loading

If static files (CSS, JavaScript) aren't loading:
- Check the Network tab in your browser's developer tools
- Verify that the paths in your HTML files are correct
- Make sure the static files are being properly served by checking the Vercel logs

### Deployment Failures

If deployment fails:
1. Check the Vercel build logs for specific errors
2. Verify that all dependencies are listed in `requirements.txt`
3. Make sure your Python version is compatible with Vercel (Python 3.9 is recommended)

## Updating Your Deployment

To update your deployment, simply push changes to your GitHub repository. Vercel will automatically redeploy your application.

```bash
git add .
git commit -m "Update application"
git push
```

Your updated application will be deployed automatically.