# 🤖 Flask AI Chatbot — Mistral-7B via HuggingFace

A clean, production-ready chatbot built with Flask and powered by Mistral-7B-Instruct through the HuggingFace Inference API.

---

## 📁 Project Structure

```
flask-chatbot/
├── app.py                  # Flask app & routes
├── requirements.txt        # Python dependencies
├── Procfile                # For Render/Heroku deployment
├── .env.example            # Sample env vars (copy to .env locally)
├── .gitignore
├── utils/
│   ├── __init__.py
│   └── hf_client.py        # HuggingFace API wrapper
├── templates/
│   └── index.html          # Chat UI
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── chat.js
```

---

## ⚙️ Local Setup

### 1. Clone / unzip the project

```bash
cd flask-chatbot
```

### 2. Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set your HuggingFace Token

Get your token from: https://huggingface.co/settings/tokens

```bash
cp .env.example .env
# Edit .env and paste your token:
# HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxx
```

> ⚠ Make sure to accept the Mistral-7B model license on HuggingFace before using it.  
> Model: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2

### 5. Run locally

```bash
python app.py
```

Visit: http://localhost:5000

---

## 🚀 Deploy to Render (Free Tier)

### Step 1 — Push code to GitHub

```bash
git init
git add .
git commit -m "Initial chatbot commit"
git remote add origin https://github.com/YOUR_USERNAME/flask-chatbot.git
git push -u origin main
```

> Do NOT commit `.env`. It's in `.gitignore`.

---

### Step 2 — Create a Render account

Go to: https://render.com → Sign up (free)

---

### Step 3 — Create a New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account
3. Select your `flask-chatbot` repository

---

### Step 4 — Configure the Service

| Field              | Value                        |
|--------------------|------------------------------|
| **Name**           | flask-chatbot (or anything)  |
| **Environment**    | Python 3                     |
| **Build Command**  | `pip install -r requirements.txt` |
| **Start Command**  | `gunicorn app:app`           |
| **Instance Type**  | Free                         |

---

### Step 5 — Add Environment Variable

In Render dashboard → **Environment** tab:

| Key         | Value                        |
|-------------|------------------------------|
| `HF_TOKEN`  | `hf_xxxxxxxxxxxxxxxxxxxx`    |

Click **"Add Environment Variable"** → Save.

---

### Step 6 — Deploy

Click **"Create Web Service"**.

Render will:
1. Install packages from `requirements.txt`
2. Start the app with gunicorn via `Procfile`
3. Give you a live URL like: `https://flask-chatbot-xxxx.onrender.com`

---

## 🔑 Getting a HuggingFace Token

1. Go to https://huggingface.co/settings/tokens
2. Click **"New token"**
3. Set name: `chatbot`, Role: **Read**
4. Copy the token (starts with `hf_...`)

---

## 🛠 Switching the AI Model

Edit `utils/hf_client.py` and change `MODEL_URL`:

```python
# Lighter / faster alternatives:
MODEL_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
MODEL_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"  # default
```

Note: Adjust the prompt format if you change models (some use different instruction templates).

---

## 💡 Tips

- **Cold starts on Render free tier**: The app sleeps after 15 min of inactivity. First request may take ~30s.
- **HuggingFace rate limits**: Free tier has request limits. For production use, consider HF Pro or self-hosting.
- **Conversation history**: This chatbot is stateless (no memory). To add multi-turn memory, store messages in a list and pass them in the prompt.

---

## 📦 Tech Stack

- **Backend**: Flask 3, Gunicorn
- **AI**: HuggingFace Inference API (Mistral-7B-Instruct)
- **Frontend**: Vanilla HTML/CSS/JS
- **Deployment**: Render

---
