zip_image() {
  local image_tag="$1"
  if [ -z "$image_tag" ]; then
    echo "❌ Usage: zip_image <image:tag>"
    return 1
  fi

  # Tách phần tên image và tag
  local name="${image_tag%%:*}"
  local tag="${image_tag##*:}"

  # Nếu không có tag thì mặc định là latest
  if [ "$name" = "$tag" ]; then
    tag="latest"
  fi

  # Tên file đầu ra
  local output="${name//\//_}-${tag}.tar.gz"

  echo "📦 Saving Docker image '$image_tag' to '$output'..."
  docker save "$image_tag" | gzip > "$output"

  if [ $? -eq 0 ]; then
    echo "✅ Image saved successfully: $output"
  else
    echo "❌ Failed to save image."
  fi
}


gunzip -c my-app-latest.tar.gz | docker load