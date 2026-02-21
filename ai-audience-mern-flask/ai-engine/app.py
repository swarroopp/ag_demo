import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Enable CORS for the Node Express backend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure upload directory
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'mp4', 'mov', 'avi'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "ai-engine"}), 200

@app.route('/api/analyze-video', methods=['POST'])
def analyze_video():
    # 1. Check if file is present in the request
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided in the request"}), 400
    
    file = request.files['video']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Save the file temporarily
        file.save(filepath)
        
        print(f"File saved to {filepath}. Starting analysis...")
        
        # 2. MOCK AI PROCESSING (Bypassing heavy ML compute for V1 prototype)
        # In a real scenario, this would pass 'filepath' to a PyTorch/CLIP model script.
        time.sleep(3) # Simulate processing time
        
        # Clean up the file after processing
        try:
            os.remove(filepath)
            print(f"Cleaned up file {filepath}")
        except Exception as e:
            print(f"Error cleaning up file: {e}")
            
        # 3. Return structured Mock Analysis Data
        mock_results = {
            "status": "success",
            "filename": filename,
            "analysis": {
                "topPersonas": [
                    {
                        "name": "Sci-Fi Intellectuals",
                        "affinity": 94,
                        "platforms": ["r/moviesuggestions", "Letterboxd", "Discord / SciFiChat"]
                    },
                    {
                        "name": "Cinematic Thrill Seekers",
                        "affinity": 82,
                        "platforms": ["YouTube / TrailerReacts", "r/movies"]
                    },
                    {
                        "name": "Casual Streamers",
                        "affinity": 45,
                        "platforms": ["TikTok / MovieTok", "Instagram Reels"]
                    }
                ],
                "communityHeatmap": {
                    "Reddit": 88,
                    "YouTube": 75,
                    "Discord": 62,
                    "TikTok": 30
                },
                "semanticVectors": [
                    {"x": 0.45, "y": 0.72, "label": "Tension"},
                    {"x": 0.88, "y": 0.21, "label": "Atmosphere"},
                    {"x": 0.12, "y": 0.90, "label": "Pacing"}
                ]
            }
        }
        
        return jsonify(mock_results), 200
        
    return jsonify({"error": "Invalid file type. Only mp4, mov, avi are allowed."}), 400

if __name__ == '__main__':
    # Run on port 5000
    app.run(debug=True, port=5000)
