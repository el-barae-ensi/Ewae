# Ewae
web app
/Ewae
│
├── /frontend                # React front-end
│   └── /my-app              # React app (can use Vite or CRA)
│
├── /backend
│   ├── /springboot-service1
    ├── /src
    │   └── /main
    │       ├── /java/com/example/service1
    │       │   ├── controller
    │       │   ├── service
    │       │   ├── repository
    │       │   └── model
    │       └── /resources
    │           └── application.yml
    ├── Dockerfile
    └── pom.xml
│   ├── /springboot-service2  # Microservice B (Java Spring Boot)
│   ├── /dotnet-service1      # Microservice C (.NET Core)
│   └── /dotnet-service2      # Microservice D (.NET Core)
│
├── /api-gateway             # Optional: gateway service (Spring Cloud Gateway or YARP for .NET)
│
├── /config-server           # Optional: centralized config (Spring Cloud Config)
│
├── /service-registry        # Optional: service discovery (Eureka, Consul)
│
├── /docker                  # Dockerfiles, Docker Compose, scripts
│
└── /docs                    # Documentation
