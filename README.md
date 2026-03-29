# Root News MVP

Root News Extension is a Minimum Viable Product (MVP) designed to provide historical context and concise summaries for news headlines right from your browser. It consists of a Chrome Extension built with React, Vite, and Tailwind CSS, and a FastAPI backend powered by Firebase Firestore and the Google Gemini API.

## Project Structure

The project is split into two primary directories:

- `/frontend` - The Chrome Extension (React + Vite + Tailwind)
- `/backend` - The Python-based REST API (FastAPI)

## Backend Configuration

The backend connects to Google Firestore to fetch historical context documents and uses the Google Gemini SDK for intelligent summarization.

### Requirements

1. Python 3.9+
2. A Firebase project with Firestore enabled.
3. A Google Cloud project with Google Gemini API access.

### Environment Variables

Before running the backend, make sure to set the following environment variables:

- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Firebase service account JSON key.
- `GEMINI_API_KEY`: Your Gemini API access key.

### Setup & Run

Navigate to the backend directory and install the dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
python main.py
```
The backend server will run on `http://localhost:8000`.

### API Endpoints

- `POST /api/root-info`: Expects a JSON payload `{"headline": "Your headline"}` and returns a dynamically generated 3-bullet point summary based on the fetched historical context.

## Frontend (Chrome Extension)

The Chrome extension sends requests to the backend for generated context summaries and natively displays them in the browser.

### Setup & Build

Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

Build the extension:

```bash
npm run build
```

This will output the compiled assets in the `frontend/dist` directory.

### Installing in Chrome

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer Mode** (toggle in the top right corner).
3. Click on **Load unpacked**.
4. Select the `frontend/dist` directory.

## Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
