
from ultralytics import YOLO

import os
class FishDetector:
    def __init__(self):
        self.model=YOLO('lib/best.pt')

    def predict(self,img_path):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        media_dir = os.path.join(base_dir, 'media')
        results = self.model.predict(
            img_path,
            conf=0.6,
            save=True,
            project=media_dir,
            name='predict',
            exist_ok=True
        )

        return len(results[0])