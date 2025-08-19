<img src="https://res.cloudinary.com/bekzod-tiny-house/image/upload/v1755599726/Screenshot_from_2025-08-19_15-35-10_apqvbq.png" alt="Project Banner" />

# 🎶 AI Music Generator

An **AI-driven music creation toolkit** that combines lyrics, beats, and cover art generation into a single workflow. It’s not meant to replace musicians — just to give you something weird, fast, and occasionally impressive without opening GarageBand.

## ✨ Features

- 🎵 **AI Music Generation** with ACE-Step
- 🧠 **LLM-Powered Lyric & Prompt Generation** with Qwen2-7B
- 🖼️ **AI Thumbnail Generation** with stabilityai/sdxl-turbo
- 🎤 **Multiple generation modes:** _descriptions, custom lyrics, or described lyrics_
- 🎸 **Instrumental Tracks** for music without vocals
- ⚡ **Serverless GPU Processing** with Modal for blazing-fast generation
- 📊 **Queue System** powered by Inngest for background task handling
- 💳 **Credit-Based System** with **Polar.sh** for seamless pack purchases
- 👤 **User Authentication** via BetterAuth
- 🎧 **Community Music Feed** to explore, play, and like AI-generated songs
- 🎛️ **Personal Track Dashboard** to manage, publish, and showcase your music
- 🐍 **Python & FastAPI Backend** driving the music logic
- 📱 **Next.js, Tailwind & Shadcn UI Frontend** for a clean, modern experience

---

## 🛠️ Technology Stack

**🔙 Backend:**

- 🐍 Python 3.12
- ⚡ FastAPI
- ☁️ Modal (serverless GPU execution)
- 📊 Inngest (event-driven queues)
- 📦 AWS S3 (file storage)

**💻 Frontend:**

- ⚛️ Next.js 14
- 🎨 Tailwind CSS
- 🖼️ Shadcn UI
- 🔐 BetterAuth (authentication)
- 💳 Polar.sh (credit packs & payments)

**🤖 AI Models:**

- 🎵 ACE-Step (music generation)
- 🧠 Qwen2-7B (lyrics & prompts)
- 🖼️ stabilityai/sdxl-turbo (thumbnails)

---

## 🚀 Setup

### Clone the Repo

```bash
git clone --recurse-submodules https://github.com/BernieTv/AI-Music-Generator.git
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
modal setup
modal run main.py
modal deploy main.py
```

> ⚠️ Note: All **backend environment variables** (AWS keys, S3 bucket name, etc.) should be configured in the **Modal Secrets tab**, not in a local `.env` file.

### Frontend Setup

```bash
cd frontend
npm i
npm run dev
```

### Queue (Inngest)

```bash
cd frontend
npx inngest-cli@latest dev
```

---

## ☁️ AWS Setup

### Policy for Frontend User

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::music-generation-bucket/*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::music-generation-bucket"
    }
  ]
}
```

### Policy for Backend User

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::music-generation-bucket/*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::music-generation-bucket"
    }
  ]
}
```

---

## 🔑 Environment Variables

### Backend

```
AWS_ACCESS_KEY_ID=""
AWS_REGION=""
AWS_SECRET_ACCESS_KEY=""
S3_BUCKET_NAME=""
```

### Frontend

```
DATABASE_URL=""

BETTER_AUTH_SECRET=""

MODAL_KEY=""
MODAL_SECRET=""

AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY_ID=""
AWS_REGION=""
S3_BUCKET_NAME=""

GENERATE_FROM_DESCRIPTION=""
GENERATE_FROM_DESCRIBED_LYRICS=""
GENERATE_WITH_LYRICS=""

POLAR_ACCESS_TOKEN=""
POLAR_WEBHOOK_SECRET=""
```

---

## 🎤 Project Vibe

This project is a playful experiment that blends music and AI. It won’t replace your favorite artist, but it’s a fun way to turn prompts into beats, lyrics, and cover art. Sometimes the results are surprisingly good, sometimes they’re quirky — but that’s part of the charm. Ideal for tinkering, learning, or just seeing what AI comes up with when asked to make music.
