FROM python:3.12-slim AS backend

WORKDIR /app/backend

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 8000

CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]


FROM node:22-alpine AS frontend

WORKDIR /app/frontend

COPY frontend/package.json ./package.json
RUN npm install

COPY frontend/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json ./package.json
RUN npm install

COPY frontend/ .

# Build-time API base (for production we use same-origin by default)
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


FROM nginx:1.27-alpine AS frontend-prod

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
