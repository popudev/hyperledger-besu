# Chứng chỉ TLS cho *.blockchain.local

Thư mục này chứa chứng chỉ tự ký (self-signed certificate) cho wildcard domain `*.blockchain.local`.

## Các file

- `tls.key` - Private key
- `tls.crt` - Certificate (chứng chỉ)
- `tls.csr` - Certificate Signing Request (có thể xóa sau khi đã tạo certificate)
- `openssl.conf` - File cấu hình OpenSSL

## Sử dụng với Kubernetes

### Tạo Secret từ file certificate:

```bash
kubectl create secret tls blockchain-local-tls \
  --cert=tls.crt \
  --key=tls.key \
  --namespace=default
```

### Hoặc tạo Secret cho namespace cụ thể:

```bash
kubectl create secret tls blockchain-local-tls \
  --cert=tls.crt \
  --key=tls.key \
  --namespace=<namespace-name>
```

### Sử dụng trong Ingress:

```yaml
spec:
  tls:
    - hosts:
        - "*.blockchain.local"
        - test.blockchain.local
        - vps.blockchain.local
      secretName: blockchain-local-tls
```

## Tạo lại certificate

Nếu cần tạo lại certificate:

```bash
# Xóa các file cũ
rm -f tls.key tls.crt tls.csr

# Tạo lại private key
openssl genrsa -out tls.key 2048

# Tạo certificate signing request
openssl req -new -key tls.key -out tls.csr -config openssl.conf

# Tự ký certificate
openssl x509 -req -in tls.csr -signkey tls.key -out tls.crt -days 365 -extensions v3_req -extfile openssl.conf
```

## Lưu ý

- Đây là chứng chỉ tự ký, chỉ phù hợp cho môi trường development/test
- Trình duyệt sẽ cảnh báo về chứng chỉ không đáng tin cậy
- Để sử dụng trong production, nên dùng chứng chỉ từ CA đáng tin cậy hoặc Let's Encrypt

