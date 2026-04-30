from fastapi import APIRouter, HTTPException
import asyncio
from pydantic import BaseModel

import agent.rag_agent as rag_agent

router = APIRouter(prefix="/rag", tags=["RAG"])


class AskRequest(BaseModel):
    question: str


@router.post("/ask")
async def ask(request: AskRequest):
    try:
        # run the potentially blocking RAG agent in a threadpool
        loop = asyncio.get_event_loop()
        answer = await loop.run_in_executor(None, rag_agent.ask_legal_ai, request.question)
        return {"answer": answer}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
