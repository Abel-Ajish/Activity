# Emoji Flip Challenge

A memory game where players find and match pairs of cards with the same emoji. Designed for two teams, this game is perfect for interactive smartboards, with a host managing the gameplay.

## 🚀 Deploying to GitHub Pages

This project is configured for easy deployment to GitHub Pages using GitHub Actions.

Follow these steps to get your game live:

### 1. Update `package.json`

Open the `package.json` file and update the `homepage` field to point to your GitHub Pages URL.

Replace `{your-github-username}` and `{your-repo-name}` with your actual details. For example, if your username is `octocat` and your repository is `emoji-game`, the line should look like this:

```json
"homepage": "https://octocat.github.io/emoji-game",
```

### 2. Push to GitHub

Commit and push your code to the `main` branch of your GitHub repository.

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 3. Configure Repository Settings

1.  Navigate to your repository on GitHub.
2.  Go to **Settings** > **Pages**.
3.  Under the "Build and deployment" section, change the **Source** to **GitHub Actions**.

That's it! The GitHub Actions workflow (defined in `.github/workflows/deploy.yml`) will automatically run. After a minute or two, your site will be live at the URL you specified in the `homepage` field. Any future pushes to `main` will automatically update the live site.
