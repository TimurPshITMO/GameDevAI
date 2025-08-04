# Проект: Запуск модели в Docker+JupyterLab

## Требования
- nvidia-docker
- GPU


## 🚀 Быстрый старт

### 1. Сборка образа
```bash
sudo docker build -t inference .
```

### 2. Запуск
```bash
  sudo docker run -it --gpus all -p 8888:8888 -v $(pwd)/notebooks:/workspace/notebooks inference
```


### 3. Инференс
Откройте в браузере:  
🔗 [http://localhost:8888/main.ipynb](http://localhost:8888/main.ipynb)
