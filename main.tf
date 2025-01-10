provider "kubernetes" {
  config_path = "~/.kube/config" # Folosește fișierul kubeconfig existent
}

# 1. Creăm un namespace pentru aplicație
resource "kubernetes_namespace" "app_namespace" {
  metadata {
    name = "app-namespace"
  }
}

# 2. Auth Service Deployment
resource "kubernetes_deployment" "auth_service" {
  metadata {
    name      = "auth-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
    labels = {
      app = "auth-service"
    }
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "auth-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "auth-service"
        }
      }
      spec {
        container {
          image = "proiect-cc-1-auth-service:latest"
          name  = "auth-service"
          port {
            container_port = 3001
          }
          env {
            name  = "MONGO_URI"
            value = "mongodb://auth-db:27017/auth"
          }
          env {
            name  = "JWT_SECRET"
            value = "supersecretkey"
          }
        }
      }
    }
  }
}

# 3. Auth Service - Service
resource "kubernetes_service" "auth_service" {
  metadata {
    name      = "auth-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "auth-service"
    }
    port {
      port        = 80
      target_port = 3001
    }
    type = "ClusterIP"
  }
}

# 4. Business Service Deployment
resource "kubernetes_deployment" "business_service" {
  metadata {
    name      = "business-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
    labels = {
      app = "business-service"
    }
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "business-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "business-service"
        }
      }
      spec {
        container {
          image = "proiect-cc-1-business-service:latest"
          name  = "business-service"
          port {
            container_port = 3003
          }
          env {
            name  = "DATABASE_SERVICE_URL"
            value = "http://database-service:3002"
          }
          env {
            name  = "AUTH_SERVICE_URL"
            value = "http://auth-service:80"
          }
        }
      }
    }
  }
}

# 5. Business Service - Service
resource "kubernetes_service" "business_service" {
  metadata {
    name      = "business-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "business-service"
    }
    port {
      port        = 80
      target_port = 3003
    }
    type = "ClusterIP"
  }
}

# 6. Database Service Deployment
resource "kubernetes_deployment" "database_service" {
  metadata {
    name      = "database-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
    labels = {
      app = "database-service"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "database-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "database-service"
        }
      }
      spec {
        container {
          image = "proiect-cc-1-database-service:latest"
          name  = "database-service"
          port {
            container_port = 3002
          }
          env {
            name  = "MONGO_URI"
            value = "mongodb://bookstore:27017/app"
          }
        }
      }
    }
  }
}

# 7. Database Service - Service
resource "kubernetes_service" "database_service" {
  metadata {
    name      = "database-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "database-service"
    }
    port {
      port        = 80
      target_port = 3002
    }
    type = "ClusterIP"
  }
}