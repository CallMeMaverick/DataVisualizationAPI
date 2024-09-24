from fastapi import FastAPI
from dotenv import load_dotenv
from app.initialization import initialize

load_dotenv()


app = FastAPI()
initialize(app)
