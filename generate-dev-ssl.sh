#!/bin/bash

# Script para generar certificados SSL autofirmados para desarrollo
# SOLO USAR PARA DESARROLLO/PRUEBAS LOCALES

echo "🔐 Generando certificado SSL autofirmado para desarrollo..."

# Verificar si ya existen certificados
if [ -f "ssl/certs/nomeatrevi.com.crt" ] && [ -f "ssl/private/nomeatrevi.com.key" ]; then
    echo "⚠️  Los certificados ya existen. ¿Deseas regenerarlos? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Operación cancelada"
        exit 0
    fi
fi

# Crear directorios si no existen
mkdir -p ssl/certs
mkdir -p ssl/private

# Generar certificado autofirmado
openssl req -x509 -newkey rsa:4096 \
    -keyout ssl/private/nomeatrevi.com.key \
    -out ssl/certs/nomeatrevi.com.crt \
    -days 365 -nodes \
    -subj "/C=ES/ST=State/L=City/O=Development/CN=nomeatrevi.com/emailAddress=dev@nomeatrevi.com" \
    -addext "subjectAltName=DNS:nomeatrevi.com,DNS:www.nomeatrevi.com,DNS:localhost"

# Establecer permisos correctos
chmod 644 ssl/certs/nomeatrevi.com.crt
chmod 600 ssl/private/nomeatrevi.com.key

echo "✅ Certificado SSL autofirmado generado exitosamente!"
echo ""
echo "📝 Archivos creados:"
echo "   - ssl/certs/nomeatrevi.com.crt"
echo "   - ssl/private/nomeatrevi.com.key"
echo ""
echo "⚠️  IMPORTANTE: Este es un certificado autofirmado para desarrollo."
echo "    Los navegadores mostrarán una advertencia de seguridad."
echo "    Para producción, usa certificados de Let's Encrypt o tu proveedor SSL."
echo ""
echo "🚀 Ahora puedes ejecutar: docker-compose up -d"