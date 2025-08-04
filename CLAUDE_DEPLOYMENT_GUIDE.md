# PWF - Deployment Guide for Claude Code

## Proyecto Overview
- **Nombre**: PWF (Proyecto Web Frontend)
- **Arquitectura**: Frontend (Vanilla JS) + Backend (Node.js Lambda)
- **Infraestructura**: AWS (Lambda + API Gateway + S3)

## URLs de Producción
- **Frontend**: http://pwf-frontend-1754265312.s3-website-us-east-1.amazonaws.com
- **Backend API**: https://2nb27x1vdb.execute-api.us-east-1.amazonaws.com/prod

## Recursos AWS Creados

### Tags utilizados en todos los recursos:
```
Project: PWF
Environment: production
Application: web-app
Description: "Full-stack web application with Node.js backend and vanilla JS frontend deployed on AWS"
```

### 1. Lambda Function
- **Nombre**: `pwf-backend`
- **Runtime**: nodejs18.x
- **Handler**: lambda.handler
- **Role**: pwf-lambda-execution-role
- **ARN**: arn:aws:lambda:us-east-1:730335202062:function:pwf-backend

### 2. API Gateway
- **Nombre**: `pwf-api`
- **ID**: 2nb27x1vdb
- **Stage**: prod
- **URL**: https://2nb27x1vdb.execute-api.us-east-1.amazonaws.com/prod

### 3. S3 Bucket
- **Nombre**: `pwf-frontend-1754265312`
- **Configuración**: Static Website Hosting
- **URL**: http://pwf-frontend-1754265312.s3-website-us-east-1.amazonaws.com

### 4. IAM Role
- **Nombre**: `pwf-lambda-execution-role`
- **Políticas**: AWSLambdaBasicExecutionRole

### 5. ECR Repository (no usado, eliminar si es necesario)
- **Nombre**: `pwf-backend`
- **URI**: 730335202062.dkr.ecr.us-east-1.amazonaws.com/pwf-backend

## Estructura del Proyecto

```
proyecto-backend-frontend/
├── backend/
│   ├── server.js          # Servidor local para desarrollo
│   ├── lambda.js          # Función Lambda para producción
│   ├── package.json       # Dependencias Node.js
│   └── Dockerfile         # NO USAR - Solo para referencia
├── frontend/
│   ├── index.html         # Frontend principal
│   ├── script.js          # Lógica del frontend
│   ├── styles.css         # Estilos CSS
│   └── config.js          # Configuración de URLs
└── CLAUDE_DEPLOYMENT_GUIDE.md
```

## Comandos de Mantenimiento

### Prerrequisitos
```bash
# AWS CLI configurado con credenciales del usuario: proyecto-deploy-user
# Account ID: 730335202062
# Region: us-east-1
```

### Actualizar Backend (Lambda)
```bash
cd backend
zip lambda-function.zip lambda.js
aws lambda update-function-code --function-name pwf-backend --zip-file fileb://lambda-function.zip
```

### Actualizar Frontend (S3)
```bash
cd frontend
aws s3 sync . s3://pwf-frontend-1754265312/ --delete
```

### Ver logs de Lambda
```bash
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/pwf-backend"
aws logs get-log-events --log-group-name "/aws/lambda/pwf-backend" --log-stream-name LATEST
```

### Probar API
```bash
# Test root endpoint
curl https://2nb27x1vdb.execute-api.us-east-1.amazonaws.com/prod/

# Test usuarios endpoint
curl https://2nb27x1vdb.execute-api.us-east-1.amazonaws.com/prod/api/usuarios

# Crear usuario
curl -X POST https://2nb27x1vdb.execute-api.us-east-1.amazonaws.com/prod/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","email":"test@example.com"}'
```

## Permisos IAM Requeridos

El usuario `proyecto-deploy-user` necesita estas políticas:
- AWSLambda_FullAccess
- AmazonAPIGatewayAdministrator  
- AmazonS3FullAccess
- CloudFrontFullAccess
- IAMFullAccess

## Configuración de Desarrollo Local

### Backend Local
```bash
cd backend
npm install
npm run dev  # Puerto 3000
```

### Frontend Local
Servir archivos estáticos desde `frontend/` y cambiar `config.js`:
```javascript
window.API_URL = 'http://localhost:3000';
```

## API Endpoints

### GET /
- **Descripción**: Health check
- **Response**: `{"mensaje": "Backend funcionando correctamente!"}`

### GET /api/usuarios
- **Descripción**: Obtener todos los usuarios
- **Response**: Array de usuarios

### GET /api/usuarios/:id
- **Descripción**: Obtener usuario por ID
- **Response**: Usuario o error 404

### POST /api/usuarios
- **Descripción**: Crear nuevo usuario
- **Body**: `{"nombre": "string", "email": "string"}`
- **Response**: Usuario creado con ID

## Troubleshooting

### CORS Issues
El Lambda incluye headers CORS. Si hay problemas:
```javascript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
```

### Lambda Cold Start
Primera invocación puede ser lenta (~1-2 segundos). Esto es normal.

### S3 Public Access
Verificar que el bucket tiene:
- Public access block: disabled
- Bucket policy: permite s3:GetObject para todos

## Limpieza de Recursos (si es necesario)

```bash
# Eliminar función Lambda
aws lambda delete-function --function-name pwf-backend

# Eliminar API Gateway
aws apigateway delete-rest-api --rest-api-id 2nb27x1vdb

# Eliminar bucket S3 (primero vaciar)
aws s3 rm s3://pwf-frontend-1754265312/ --recursive
aws s3api delete-bucket --bucket pwf-frontend-1754265312

# Eliminar rol IAM
aws iam detach-role-policy --role-name pwf-lambda-execution-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam delete-role --role-name pwf-lambda-execution-role
```

## Monitoreo

### CloudWatch Metrics
- Lambda: Invocations, Duration, Errors
- API Gateway: 4XXError, 5XXError, Latency
- S3: NumberOfObjects, BucketSizeBytes

### Logs
- Lambda logs: `/aws/lambda/pwf-backend`
- API Gateway logs: Habilitar si es necesario

## Git Branch Naming Convention

**IMPORTANTE**: Todas las branches deben seguir el patrón:
- `#1-descripcion`
- `#2-descripcion` 
- `#3-descripcion`
- etc.

Donde "descripcion" es una breve descripción del cambio (ej: aws-deployment, bug-fix, new-feature).

### Ejemplo de creación y push de nueva branch:
```bash
git checkout -b "#2-nueva-funcionalidad"
git add .
git commit -m "Mensaje del commit"
git push -u origin "#2-nueva-funcionalidad"
```

---

**Última actualización**: 2025-08-04
**Responsable**: Claude Code Deployment