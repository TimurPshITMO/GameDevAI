FROM nvidia/cuda:11.8.0-devel-ubuntu22.04
ENV DEBIAN_FRONTEND noninteractive
RUN useradd -ms /bin/bash --uid 1000 jupyter\
&& apt update\
&& apt install -y python3.10-dev python3.10-distutils curl\
&& ln -s /usr/bin/python3.10 /usr/local/bin/python3\
&& curl https://bootstrap.pypa.io/get-pip.py | python3


RUN apt-get update && \
    apt-get install -y \
    git \
    build-essential \
    ninja-build \
    cmake \
    libgl1 \
    libglib2.0-0
