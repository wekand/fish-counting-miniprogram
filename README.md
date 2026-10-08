# 鱼苗自动识别计数小程序

基于 YOLOv8 目标检测 + Django + 微信小程序的鱼苗智能计数系统。手机拍摄鱼苗照片后自动识别并框出每条鱼苗，实时统计数量。

## 技术栈

| 层 | 技术 |
|---|---|
| 后端 | Django 5 + SQLite |
| AI 模型 | YOLOv8n（Ultralytics），CPU 推理 |
| 前端 | 微信小程序原生（WXML / WXSS / JS） |
| 数据采集 | Python Selenium 爬虫 + Pillow 预处理 |
| 数据标注 | Roboflow |

## 功能特性

- 📷 **拍照 / 相册选图**：调用微信相机或相册上传鱼苗照片
- 🤖 **AI 自动计数**：YOLOv8n 检测并框出鱼苗，返回数量
- 🖼️ **结果可视化**：结果页展示带检测框的标注图
- 📊 **历史记录入库**：每次检测结果写入 SQLite，支持按时间查询
- 🗑️ **软删除机制**：基于 `is_delete` 标记，避免物理删除丢失历史数据

## 项目结构

```
fish-counting-miniprogram/
├── backend/                  # Django 后端
│   ├── fish/                 # 业务 app
│   │   ├── models.py         # FishBase 数据表
│   │   ├── views.py          # upload / fishbase 接口
│   │   └── urls.py           # 业务路由
│   ├── lib/                  # AI 推理
│   │   ├── yolov8.py         # FishDetector 封装类
│   │   └── best.pt           # 训练好的模型权重（不入库）
│   ├── media/                # 上传图 + 标注图（运行时生成）
│   └── manage.py
├── miniprogram/              # 微信小程序
│   ├── pages/
│   │   ├── index/            # 首页：预览 + 提交
│   │   ├── camera/           # 相机页：拍照 / 切镜
│   │   └── result/           # 结果页：数量 + 标注图
│   └── config/settings.js     # API 地址配置
└── README.md
```

## 快速启动

### 1. 启动后端

```bash
cd backend
pip install django ultralytics torch
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

> 模型权重 `lib/best.pt` 需要自行训练后放入。

### 2. 配置小程序

1. 用微信开发者工具打开 `miniprogram/` 目录
2. 修改 `miniprogram/config/settings.js` 里的 `rootUrl`，改成电脑的局域网 IP：
   ```javascript
   const rootUrl = 'http://<你的电脑IP>:8000/fish'
   ```
3. 开发者工具 → 本地设置 → 勾选"不校验合法域名"
4. 手机和电脑连同一 WiFi，扫码预览即可

## API 接口

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/fish/upload/` | 上传鱼苗图片（字段名 `avatar`），触发检测并入库 |
| GET | `/fish/fishbase/` | 返回最新一条检测结果（标注图 URL + 鱼苗数量） |

返回示例：
```json
{
  "code": 100,
  "msg": "成功",
  "result": ["http://192.168.1.100:8000/media/predict/avatar.jpg", 24]
}
```

## 模型训练

- **数据采集**：用 Selenium 模拟浏览器爬取百度图片、必应图片中的鱼苗照片，共采集 204 张
- **数据预处理**：Pillow 统一缩放为 640×640 PNG，requests 批量下载
- **数据标注**：Roboflow 手动框选鱼苗目标
- **训练配置**：CPU 训练 100 epochs，训练集 / 验证集 / 测试集 = 7:2:1
- **推理参数**：置信度阈值 conf=0.6，过滤低置信度误检

## 开发环境

- CPU：Intel i5-12450H（无 GPU，纯 CPU 推理）
- OS：Windows 11
- Python 3.12+ / PyTorch 2.x
- 微信开发者工具 + PyCharm

## 简历项目描述（可直接使用）

> **鱼苗自动识别计数小程序** — 独立设计并实现基于 YOLOv8n 的鱼苗智能计数系统。使用 Selenium 爬取 204 张鱼苗图片，Roboflow 标注后在 CPU 上训练目标检测模型；后端基于 Django 封装 RESTful 接口，接收小程序上传的图片后调用 YOLO 推理，自动框选鱼苗并计数，结果与标注图存入 SQLite；前端为微信小程序原生开发，支持拍照、相册选图、结果展示与历史记录查询。
