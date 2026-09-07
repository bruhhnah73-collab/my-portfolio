### YouTube to Google Sheets AI Description Engine

An automated serverless data pipeline that monitors a YouTube channel for new video uploads, processes titles through an advanced AI model to generate SEO-optimized description box copy, and appends the final records directly into a Google Sheets database. 

### 🚀 System Architecture

The data flow follows a strict sequential transactional timeline across cloud matrices: 

1. **Trigger Node:** YouTube (Data Polling Engine)
2. **Processing Core:** Groq AI Engine running the qwen/qwen3.8-27b model
3. **Database Sink:** Google Sheets (Continuous Row Appender)

### 🛠️ Tech Stack & Integration Specs

* **Orchestration Layer:** Make.com Serverless Scenarios
* **Large Language Model (LLM):** Qwen-27B via Groq Console API
* **Token Optimization:** Capped at 500 max returned tokens for free-tier compliance
* **Dynamic Field Mapping Syntax:** {{9.choices[].message.content}}

### ⚙️ Configuration Setup

### 1. System Prompt (SEO Rules)

text

You are an expert YouTube SEO and marketing manager. Your job is to take the title of an incoming YouTube video and write a high-converting, viral, and engaging description box packed with search optimized keywords and relevant hashtags. Keep it punchy, clean, and organize it neatly. Do not include introductory text. Output only the raw description copy directly.

Use code with caution.

### 2. Database Schema

* **Column A (Topic):** Maps dynamically to the YouTube Title variable payload.
* **Column B (AI Generated Post):** Injects the filtered AI chat completion output string.
