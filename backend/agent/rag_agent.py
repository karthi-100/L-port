import os
from google import genai
from google.genai import types
import chromadb
from pypdf import PdfReader
from config.settings import settings

# 1. Configuration
GEMINI_API_KEY = settings.GEMINI_API_KEY
client = genai.Client(api_key=GEMINI_API_KEY)

# Initialize ChromaDB (creates a 'legal_vectors' folder in your project)
db_client = chromadb.PersistentClient(path="./legal_vectors")
collection = db_client.get_or_create_collection(name="law_firm_portfolio")

def get_embedding(text_chunk):
    """Generates a 768-dimensional vector for a text chunk"""
    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text_chunk
    )
    return response.embeddings[0].values

def process_and_store_pdf(pdf_path):
    """Reads PDF, splits text, and stores vectors in ChromaDB"""
    reader = PdfReader(pdf_path)
    text_content = ""
    for page in reader.pages:
        text_content += page.extract_text() + "\n"

    # Chunking: Splitting by double newlines to keep legal paragraphs intact
    chunks = [c.strip() for c in text_content.split('\n\n') if len(c.strip()) > 50]
    
    embeddings = []
    metadata = []
    ids = []

    for i, chunk in enumerate(chunks):
        vector = get_embedding(chunk)
        embeddings.append(vector)
        metadata.append({"source": pdf_path, "chunk_id": i})
        ids.append(f"{pdf_path}_{i}")

    # Batch add to ChromaDB
    collection.add(
        embeddings=embeddings,
        documents=chunks,
        metadatas=metadata,
        ids=ids
    )
    print(f"Successfully indexed {len(chunks)} chunks from {pdf_path}")

def ask_legal_ai(question):
    """RAG Flow: Search DB -> Construct Prompt -> Generate Answer"""
    # Generate embedding for the user query
    query_vector = get_embedding(question)

    # Query ChromaDB for top 3 most relevant matches
    results = collection.query(
        query_embeddings=[query_vector],
        n_results=3
    )

    # Combine the found text chunks into one context string
    context_text = "\n\n".join(results['documents'][0])

    # Generate the final response using Gemini 1.5 Flash
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        config=types.GenerateContentConfig(
            system_instruction=(
                "You are a highly precise legal assistant. Use the provided context "
                "to answer the question. If the context doesn't contain the answer, "
                "politely say you don't have that specific information. Always maintain "
                "a professional, law-firm appropriate tone."
            ),
            temperature=0.2, # Lower temperature for higher factual accuracy
        ),
        contents=f"Context from legal documents:\n{context_text}\n\nUser Question: {question}"
    )

    return response.text

# --- Example Usage ---
# 1. Run this once to populate your DB
# process_and_store_pdf("family_law_guide.pdf")

# 2. Query your AI
# print(ask_legal_ai("What are the payment terms mentioned in the contract?"))