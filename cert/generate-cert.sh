#!/bin/bash

# Script tạo chứng chỉ tự ký cho *.blockchain.local

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Đang tạo chứng chỉ tự ký cho *.blockchain.local..."

# Xóa các file cũ nếu có
if [ -f "tls.key" ] || [ -f "tls.crt" ] || [ -f "tls.csr" ]; then
    read -p "Các file certificate cũ sẽ bị xóa. Tiếp tục? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Đã hủy."
        exit 1
    fi
    rm -f tls.key tls.crt tls.csr
fi

# Tạo private key
echo "1. Tạo private key..."
openssl genrsa -out tls.key 2048

# Tạo certificate signing request
echo "2. Tạo certificate signing request..."
openssl req -new -key tls.key -out tls.csr -config openssl.conf

# Tự ký certificate
echo "3. Tự ký certificate..."
openssl x509 -req -in tls.csr -signkey tls.key -out tls.crt -days 365 -extensions v3_req -extfile openssl.conf

# Xóa CSR file (không cần thiết sau khi đã tạo certificate)
rm -f tls.csr

echo ""
echo "✅ Đã tạo chứng chỉ thành công!"
echo ""
echo "Các file đã tạo:"
echo "  - tls.key (private key)"
echo "  - tls.crt (certificate)"
echo ""
echo "Để tạo Secret trong Kubernetes:"
echo "  kubectl create secret tls blockchain-local-tls --cert=tls.crt --key=tls.key --namespace=default"
echo ""

# Hiển thị thông tin certificate
echo "Thông tin certificate:"
openssl x509 -in tls.crt -text -noout | grep -A 1 "Subject:"
openssl x509 -in tls.crt -text -noout | grep -A 2 "Subject Alternative Name"

