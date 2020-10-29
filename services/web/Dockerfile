FROM python:3.8.1-slim-buster

WORKDIR /usr/src/app

# Variables para que python no cree archivos pyc y para que no envie mensajes a consola
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instalar los paquetes para construir el cliente de postgressql psycopg2-binary con pip
RUN apt update && apt-get install -y gcc-8 libpq-dev netcat libssl-dev libffi-dev python3-dev&& ln -s /usr/bin/gcc-8 /usr/bin/gcc 

# Actualizando pip e instalando los paquetes necesarios
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /usr/src/app/ 

# Ejecuta entrypoint.sh
# ENTRYPOINT ['/usr/src/app/entrypoint.sh']
CMD sh
