#!/bin/bash

if [ -f /workspace/install_gpu.py ]; then
    python /workspace/install_gpu.py && touch /workspace/installed_gpu.txt
fi

exec "$@"