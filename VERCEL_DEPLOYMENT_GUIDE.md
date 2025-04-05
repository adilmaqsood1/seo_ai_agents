# Optimized Vercel Deployment Guide

This guide explains the optimizations made to deploy the SEO AI Agents application to Vercel while addressing the 250MB size limitation issue.

## Changes Made

### 1. Added `.vercelignore`

A `.vercelignore` file was created to exclude unnecessary files and directories from the deployment package:

- Development files (like `__pycache__`, `.pyc` files)
- Version control files (`.git`)
- Test files and documentation
- Environment files (except `.env.example`)
- Large dependencies that can be installed at build time

### 2. Optimized `vercel.json`

The `vercel.json` configuration was updated to:

- Set a maximum Lambda size of 15MB
- Specify Python 3.9 as the runtime

```json
{
    "builds": [
        {
            "src": "main_with_static.py",
            "use": "@vercel/python",
            "config": {
                "maxLambdaSize": "15mb",
                "runtime": "python3.9"
            }
        },
        {
            "src": "static/**",
            "use": "@vercel/static"
        }
    ],
    "routes": [
        {
            "src": "/static/(.*)",
            "dest": "/static/$1"
        },
        {
            "src": "/(.*)",
            "dest": "main_with_static.py"
        }
    ]
}
```

### 3. Added `runtime.txt`

A `runtime.txt` file was added to explicitly specify Python 3.9:

```
python-3.9
```

### 4. Optimized `requirements.txt`

The `requirements.txt` file was updated with specific versions to ensure compatibility and reduce package size:

```
fastapi==0.104.1
uvicorn==0.23.2
groq==0.4.1
beautifulsoup4==4.12.2
pydantic==2.4.2
python-dotenv==1.0.0
requests==2.31.0
jinja2==3.1.2
```

The `crawl4ai` package was removed as it's not being used in the codebase.

## Deployment Steps

1. **Push these changes to your GitHub repository**:

```bash
git add .
git commit -m "Optimize for Vercel deployment"
git push
```

2. **Connect to Vercel**:

- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click "Add New" → "Project"
- Import your GitHub repository
- Configure the project (Framework Preset: "Other")

3. **Configure Environment Variables**:

- Add your `GROQ_API_KEY` as an environment variable

4. **Deploy**:

- Click "Deploy"
- Wait for the deployment to complete

## Troubleshooting

If you still encounter size limitation issues:

1. **Check Vercel Logs**: Review the build logs for specific errors
2. **Further Optimize Dependencies**: Consider using lighter alternatives for some packages
3. **Split the Application**: Consider splitting into multiple serverless functions
4. **Use Vercel Edge Functions**: For certain functionality that requires less overhead

## Monitoring

After deployment, monitor your application's performance and resource usage in the Vercel dashboard to ensure it stays within the size limits.