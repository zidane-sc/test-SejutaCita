# Test Coding SejutaCita

## Table of Contents

- [Tech Stacks](#tech-stacks)
- [Architecture Diagram](#architecture-diagram)
- [Repo Structure](#repo-structure)
- [How To Deploy](#how-to-deplot)
- [Demo Deploy On Local](#demo-deploy-on-local)
- [Credential](#credential)

## Tech Stacks
- **Javascript** - <https://www.javascript.com>
- **Node.js** - <http://nodejs.org>
- **Mongoose** - <https://mongoosejs.com>
- **MongoDB** - <https://www.mongodb.com>

## Architecture Diagram
![sejutarasa-diagram-arsitektur (1)](https://user-images.githubusercontent.com/67301786/165173209-ca6aab67-dfd1-433f-83ab-68ea664d589d.png)

## Repo Structure
```
├── <name>-service                        * service
  └── kubernetes/                         * deployment and ingrest config
    └── src/
      └── lib/                            * plugin that application use
      └── middleware/                     * middleware for the application
      └── modules/                        * where all the magics happen
        └── <module_name>
          └── models/                     * models for the module
          └── validation/                 * validation for request or param
          └── <module_name>.handler       * handler route
          └── <module_name>.route         * route api
          └── <module_name>.service       * all business logic
      └── routes/                         * collect of modules route api
      └── app.js                          * entry point file
    └── ...
├── configmap.yml                         * environtment variable for pods
├── secret.yml                            * secret environtment variable for pods
    
```

## How To Deploy
How to deploy the app

### 1. Clone the project:

```bash
git clone https://github.com/zidane-sc/test-SejutaCita.git
cd test-SejutaCita
```

### 2. Build Image
- build image auth service
```bash
docker build ./auth-service -t auth-service:0.1.0
```

- build image user service
```bash
docker build ./user-service -t user-service:0.1.0
```


### 3. Setup Mongodb on localhost
```bash
docker volume create mongodb-testsejutacita-volume
docker run -d -p 27016:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root --name mongodb-testsejutacita -v mongodb-testsejutacita-volume:/data/db mongo:4.4
```
### 4. Setup Configmap dan Secret
```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
```

### 5. Setup Deployment
- deployment for auth service
```bash
kubectl apply -f auth-service/kubernetes/deployment.yaml
```

- deployment for user service
```bash
kubectl apply -f user-service/kubernetes/deployment.yaml
```

### 6. Setup Service
- Setup service for auth service
```bash
kubectl expose deployment auth-service --type NodePort
```
- Setup service for user service
```bash
kubectl expose deployment user-service  --type NodePort
```


### 7. Setup Ingress
- Setup ingress for auth service
```bash
kubectl apply -f auth-service/kubernetes/ingress.yaml
echo "127.0.0.1 api.testsejutacita.auth" | sudo tee -a /etc/hosts
```

- Setup ingress for user service
```bash
kubectl apply -f user-service/kubernetes/ingress.yaml
echo "127.0.0.1 api.testsejutarasa.user" | sudo tee -a /etc/hosts
```

## Demo Deploy On Local
Using docker desktop
### 1. Build the image
![ezgif com-gif-maker](https://user-images.githubusercontent.com/67301786/165171266-e28be26a-f1f1-4777-8469-4e17c44049eb.gif)

### 2. Setup database (MongoDB)
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/67301786/165171380-095ec99c-1e5f-485d-a532-0207e0d168ce.gif)

### 3. Setup environment for the pod
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/67301786/165171471-44307802-9fc1-4445-bb02-4183e139a441.gif)

### 4. Setup deployment
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/67301786/165171539-ffd0676f-80c3-4689-9db5-745608e8f024.gif)

### 5. Setup Service
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/67301786/165171625-f161d8a0-ed2e-45d0-8cf7-f7e1a3a7c023.gif)

### 6. Setup Ingress
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/67301786/165171683-2cea3ba4-6094-4169-8959-6ab47e3f3e62.gif)

### 7. Test On Postman👨🏻‍💻
![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/67301786/165171871-81d4b1df-9f79-424b-bd40-afb18c0cb39a.gif)


## Credential
### Link documentation API: 
- [postman](https://documenter.getpostman.com/view/12241925/UyrBkGja)  

### Account
- **Admin**  
username: admin  
password: admin

- **User**  
username: user  
password: user
 
