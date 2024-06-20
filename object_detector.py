from ultralytics import YOLO


# Load a COCO-pretrained YOLOv8n model
model = YOLO("yolov8n.pt")

# Display model information (optional)
# model.info()

# Run inference with the YOLOv8n model on the 'bus.jpg' image
results = model.predict(source='dog.jpg', device='cpu', conf=0.2, iou=0.8)



# print(results[0].boxes)
list_of_names = [ results[0].names[(results[0].boxes.cls.cpu().numpy()[i])] for i in range(len(results[0].boxes.cls)) ]


results_Dict = dict()
for (i, classification) in enumerate(results[0].boxes.cls.cpu().numpy()):
    results_Dict[results[0].names[classification]] = results[0].boxes.conf.cpu().numpy()[i]


results[0].save('lol.jpg')