"""
Anywear AI Mock Server
Simulates WebSocket & HTTP endpoints for real-time virtual try-on frame inference.
"""

import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "Anywear AI Inference Engine",
        "version": "1.0.0"
    })

@app.route('/api/try-on', methods=['POST'])
def process_tryon():
    """
    Receives user webcam frame + target garment image URL and returns
    synthesized virtual try-on response.
    """
    data = request.get_json() or {}
    garment_url = data.get('garment_url')
    user_frame = data.get('frame')  # Base64 data URL

    return jsonify({
        "success": True,
        "message": "Frame received and processed",
        "latency_ms": 120,
        "garment_detected": bool(garment_url)
    })

if __name__ == '__main__':
    print("Starting Anywear AI mock server on http://localhost:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=True)
