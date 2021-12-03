# Prerequisite
Node JS v16  
Docker (Engine v20.10.11)  
Kubernetes v1.22.4  
Skaffold v1.35.1  

# Tech Stack
Typescript  
Next  
MongoDB  
Express  
NATS Streaming Server  
Ingress Nginx  

# Running The App
Install ingress-controller
```
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml
```

Create secret env variable inside cluster
```
  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_secret_key
```

Run `skaffold dev` in the root directory

Get list of pods
```
  kubectl get pods
```

Port forwarding nats
```
  kubectl port-forward nats-depl-pod-name 4222:4222
```

Add `gotix.dev` inside hosts file (`/etc/hosts` in Mac/Linux)
```
  127.0.0.1 gotix.dev
```

Open your browser and go to `gotix.dev`
