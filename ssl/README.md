# Configuración de Certificados SSL

Para que funcione el proxy HTTPS, necesitas colocar tus certificados SSL en los siguientes archivos:

## Ubicación de certificados:
- **Certificado público**: `ssl/certs/nomeatrevi.com.crt`
- **Clave privada**: `ssl/private/nomeatrevi.com.key`

## Opciones para obtener certificados:

### Opción 1: Let's Encrypt (Gratuito)
```bash
# Instalar certbot
sudo apt update
sudo apt install certbot

# Obtener certificado (requiere que el dominio apunte a tu servidor)
sudo certbot certonly --standalone -d nomeatrevi.com -d www.nomeatrevi.com

# Copiar certificados a este proyecto
sudo cp /etc/letsencrypt/live/nomeatrevi.com/fullchain.pem ssl/certs/nomeatrevi.com.crt
sudo cp /etc/letsencrypt/live/nomeatrevi.com/privkey.pem ssl/private/nomeatrevi.com.key
```

### Opción 2: Cloudflare SSL
Si usas Cloudflare, puedes generar certificados desde su panel:
1. Ve a SSL/TLS > Origin Server
2. Crea un certificado de origen
3. Guarda el certificado como `ssl/certs/nomeatrevi.com.crt`
4. Guarda la clave privada como `ssl/private/nomeatrevi.com.key`

### Opción 3: Certificado autofirmado para desarrollo
```bash
# Solo para desarrollo/pruebas locales
openssl req -x509 -newkey rsa:4096 -keyout ssl/private/nomeatrevi.com.key -out ssl/certs/nomeatrevi.com.crt -days 365 -nodes -subj "/CN=nomeatrevi.com"
```

## Permisos importantes:
```bash
# Asegurar permisos correctos
chmod 644 ssl/certs/nomeatrevi.com.crt
chmod 600 ssl/private/nomeatrevi.com.key
```

## Una vez que tengas los certificados:
```bash
# Levantar todos los servicios
docker-compose up -d

# Verificar que Nginx está funcionando
docker-compose logs nginx
```

## Estructura de URLs:
- **Frontend**: https://nomeatrevi.com
- **API Backend**: https://nomeatrevi.com/api/*
- **Mongo Express**: http://localhost:8081 (solo desarrollo)

## Notas importantes:
1. El frontend en producción hará peticiones a `/api/*` que serán redirigidas por Nginx al backend
2. En desarrollo local, seguirá usando `http://localhost:3000` directamente
3. Todo el tráfico HTTP será redirigido automáticamente a HTTPS