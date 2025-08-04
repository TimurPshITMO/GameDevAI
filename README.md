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
  sudo docker run -it --gpus all -p 8888:8888 -v $(pwd)/:/workspace/notebooks inference
```


### 3. Инференс
Откройте в браузере:  
🔗 [http://localhost:8888/main.ipynb](http://localhost:8888/main.ipynb)

### TRELLIS
```
@article{xiang2024structured,
    title   = {Structured 3D Latents for Scalable and Versatile 3D Generation},
    author  = {Xiang, Jianfeng and Lv, Zelong and Xu, Sicheng and Deng, Yu and Wang, Ruicheng and Zhang, Bowen and Chen, Dong and Tong, Xin and Yang, Jiaolong},
    journal = {arXiv preprint arXiv:2412.01506},
    year    = {2024}
}
```
