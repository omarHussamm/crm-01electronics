from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello_api():
    return {"Message":"Welcome to 01electonics CRM"}