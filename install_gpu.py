import os
import sys
import subprocess

def pip_install(package_str):
    """
    Install a Python package using pip via subprocess.
    
    Args:
        package_str (str): The package specifier string to pass to pip install.
    """
    # Construct the full command: python -m pip install <package_str>
    command = [sys.executable, '-m', 'pip', 'install'] + package_str.split()

    try:
        print(f"Running command: {' '.join(command)}")
        subprocess.check_call(command)
        print(f"Successfully installed: {package_str}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install {package_str} with error: {e}")


def install_git_repo(repo_url, package_path=None, install_args=None):
    try:
        if package_path and os.path.exists(package_path):
            print(f"{package_path} already exists, skipping clone")
        else:
            subprocess.check_call(['git', 'clone', '--recurse-submodules', repo_url, package_path])
        
        if install_args:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + install_args + [package_path])
        else:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package_path])
    except subprocess.CalledProcessError as e:
        print(f"Failed to install from {repo_url}: {e}")


if __name__ == '__main__':
    print("Установка зависимостей с gpu...")
    tmp_dir = '/tmp/extensions'
    os.makedirs(tmp_dir, exist_ok=True)

    install_git_repo(
        'https://github.com/JeffreyXiang/diffoctreerast.git',
        os.path.join(tmp_dir, 'diffoctreerast')
    )
    install_git_repo(
        'https://github.com/NVlabs/nvdiffrast.git',
        os.path.join(tmp_dir, 'nvdiffrast')
    )

    install_git_repo(
        'https://github.com/autonomousvision/mip-splatting.git',
        os.path.join(tmp_dir, 'mip-splatting')
    )

    pip_install(os.path.join(tmp_dir, 'mip-splatting/submodules/diff-gaussian-rasterization'))
    
    pip_install("kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.4.0_cu121.html")
    pip_install("xformers==0.0.27.post2 --index-url https://download.pytorch.org/whl/cu118")
