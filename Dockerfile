# ---- Base Node ----
FROM node:alpine AS base
# Copy project file
COPY . .
# Build project
ARG VUE_APP_BRANCH
ENV VUE_APP_BRANCH=$VUE_APP_BRANCH
RUN yarn
RUN VUE_APP_BRANCH=$VUE_APP_BRANCH yarn build

# ---- Prod ----
FROM nginx:alpine
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base dist /usr/share/nginx/html
