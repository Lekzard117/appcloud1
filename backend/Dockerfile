FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Copiamos requirements y los instalamos
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiamos todo el código Django desde el contexto actual (ya estás en backend/)
COPY back-django/backend/ .

# Copiamos el entrypoint.sh y le damos permisos
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Exponemos el puerto
EXPOSE 8000

# Ejecutamos el script
CMD ["./entrypoint.sh"]
