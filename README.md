````markdown
# 🚀 Social Media Post Generator with Node.js + Google Gemini AI

Automatically generate platform-specific content for Twitter, LinkedIn, Medium, and more — using Node.js and Google Gemini AI.

This tool helps developers, content creators, and startup teams turn a single piece of content into multiple, well-formatted social media posts with the tone and structure each platform expects.

---

## ✨ Features

- ✅ Express.js API for easy integration
- 🤖 Google Gemini AI for human-like content
- 🧠 Platform-specific prompts (customizable)
- 🔁 Retry logic to refine responses
- 🛠 Developer-friendly and extendable

---

## 📦 Installation

```bash
git clone https://github.com/dibishks/ai-socialmedia-post-writer.git
cd ai-socialmedia-post-writer
npm install
```
````

Create a `.env` file with your Gemini API key:

```env
GEMINI_API_KEY=your_google_gemini_key_here
```

Start the server:

```bash
node index.js
```

---

## 📤 Sample Request

Use the `/generate-all` endpoint to generate content for all platforms in one go.

```bash
curl --location 'http://localhost:3000/generate-all' \
--header 'Content-Type: application/json' \
--data '{
  "content": "5 tips for using GitHub Copilot with issues to boost your productivity."
}'
```

---

## 🧪 Example Response

```json
{
  "linkedin": "Here are 5 ways to use GitHub Copilot and GitHub Issues together...",
  "twitter": "Want to boost dev productivity? 🧵\n\nHere are 5 smart ways GitHub Copilot and Issues work better *together*...",
  "medium": "### 5 Tips to Use GitHub Copilot with Issues Like a Pro\n\nIf you want to speed up development and organize your workflow...",
  "linkedin_article": "#### Supercharge Your Workflow: GitHub Copilot Meets GitHub Issues\n\nManaging tasks while coding can be tough. Here's how to bridge the two..."
}
```

---

## 🛠 Customizing Prompts

Each platform has a dedicated prompt file under `prompts/`. For example:

- `prompts/twitter.json`
- `prompts/linkedin.json`
- `prompts/medium.json`
- `prompts/article.json`

Update these files to control tone, format, or style.

Prompt format uses `{{content}}` as the placeholder for input text:

```txt
Write a professional LinkedIn post based on the following content: {{content}}
```

---

## 🔁 Retry Logic

You can include a retry count (default is 1) in your request to improve quality:

```json
{
  "content": "AI tools to automate dev workflows",
  "retries": 3
}
```

---

## 🧩 Supported Platforms

- LinkedIn post
- Twitter thread
- Medium blog
- LinkedIn article

You can easily add more types by updating the `SUPPORTED_TYPES` list and adding new prompt files.

---

## 📄 License

MIT License

---

## 🙋‍♂️ Author

Created by [Dibeesh KS](https://www.linkedin.com/in/dibeeshks/)
Follow for tech + automation content → [@dibishks](https://x.com/dibishks)

```

```
