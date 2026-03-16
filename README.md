# PIXRITY | Augmented Reality for Luxury Retail

This is the code for the PIXRITY landing page featuring high-end XR visualization and try-on solutions for jewellery brands.

## Deployment on Netlify

### Option 1: Drag and Drop (Easiest)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `pix` folder into the upload area.
3. Your site will be live in seconds!

### Option 2: Connecting to GitHub (Recommended for CI/CD)
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initialize project"
   ```
2. Create a repository on GitHub and push your code.
3. On Netlify, select **Add new site** > **Import an existing project**.
4. Select your GitHub repository.
5. Netlify will automatically detect the settings from `netlify.toml`.

## Local Development

To run the project locally with live-reload:
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm start
   ```
