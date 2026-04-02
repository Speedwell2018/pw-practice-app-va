FROM mcr.microsoft.com/playwright:v1.59.0-jammy

RUN mkdir -p /workspace
WORKDIR /workspace

# Copy and install the Angular app
COPY pw-practice-app pw-practice-app
RUN npm install --force --prefix pw-practice-app

# Copy and install Playwright tests
COPY pw-test pw-test
WORKDIR /workspace/pw-test
RUN npm install

#CMD ["npm", "run", "pageObjects-chrome"]
