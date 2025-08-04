FROM pytorch/pytorch:2.4.0-cuda11.8-cudnn9-devel

RUN apt-get update && \
    apt-get install -y \
    git \
    build-essential \
    ninja-build \
    cmake \
    libgl1 \
    libglib2.0-0


RUN pip install --no-cache-dir \
    "opencv-python-headless>=4.8.0,<4.11.0" \
    jupyterlab


COPY ./TRELLIS/setup.sh /workspace/setup.sh
COPY ./install_gpu.py /workspace/install_gpu.py
COPY ./setup.py /workspace/setup.py
COPY ./entrypoint.sh /workspace/entrypoint.sh
COPY ./model.ipynb /workspace/model.ipynb
WORKDIR /workspace
RUN  chmod +x entrypoint.sh && \
    chmod +x setup.sh && \
    ./setup.sh --basic && \
    rm -f setup.sh

EXPOSE 8888

ENTRYPOINT ["/workspace/entrypoint.sh"]
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", "--NotebookApp.token=''", "--NotebookApp.password=''"]
