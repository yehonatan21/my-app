FROM python:3.11-alpine

WORKDIR /app

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

COPY ./ssl/self-signed.crt /app/ssl/self-signed.crt 
COPY ./ssl/self-signed.key /app/ssl/self-signed.key 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--ssl-keyfile", "/app/ssl/self-signed.key", "--ssl-certfile", "/app/ssl/self-signed.crt"]
