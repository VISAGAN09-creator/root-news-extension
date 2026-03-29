from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, Firestore
from google import genai
import os

# Initialize Firebase
# This relies on the GOOGLE_APPLICATION_CREDENTIALS environment variable
# being set, or running in an environment with default credentials.
try:
    if not firebase_admin._apps:
        firebase_admin.initialize_app()
except Exception as e:
    print(f"Warning: Failed to initialize Firebase: {e}")

try:
    db = firestore.client()
except Exception as e:
    db = None
    print(f"Warning: Firestore client failed to initialize: {e}")

# Initialize Gemini SDK
# This relies on the GEMINI_API_KEY environment variable
try:
    gemini_client = genai.Client()
except Exception as e:
    gemini_client = None
    print(f"Warning: Failed to initialize Gemini client: {e}")

app = FastAPI(title="Root Info Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InfoRequest(BaseModel):
    headline: str

@app.post("/api/root-info")
async def get_root_info(request: InfoRequest):
    if not db:
        raise HTTPException(status_code=500, detail="Firestore is not initialized.")
    if not gemini_client:
        raise HTTPException(status_code=500, detail="Gemini client is not initialized.")
        
    try:
        # Fetch document from Firestore
        doc_ref = db.collection('historical_context').document('chip-war')
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Document 'chip-war' not found in Firestore.")
            
        doc_context = str(doc.to_dict())
        
        # Prepare the prompt for the Gemini SDK
        prompt = (
            f"Headline: {request.headline}\n\n"
            f"Historical Context: {doc_context}\n\n"
            f"Task: Based on the provided Historical Context and the Headline, "
            f"summarize the text into exactly 3 concise bullet points."
        )
        
        # Generate the summary
        response = gemini_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        return {"summary": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
