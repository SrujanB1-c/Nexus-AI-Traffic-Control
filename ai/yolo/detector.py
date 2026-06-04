from ultralytics import YOLO

model = YOLO("yolov8n.pt")

def detect(frame):

    results = model(frame)

    detections = []

    for result in results:

        for box in result.boxes:

            detections.append({

                "class":
                    int(box.cls[0]),

                "confidence":
                    float(box.conf[0]),

                "bbox":
                    box.xyxy[0].tolist()
            })

    return detections