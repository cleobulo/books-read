
FROM python:3.8

WORKDIR /server

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt

COPY . /server

EXPOSE 80

CMD ["fastapi", "run", "app.py", "--port", "80"]
