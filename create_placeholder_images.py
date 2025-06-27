#!/usr/bin/env python3
"""
Create placeholder images for the CAD-Assistant landing page
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(width, height, text, filename, bg_color=(240, 240, 240), text_color=(100, 100, 100)):
    """Create a placeholder image with text"""
    image = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(image)
    
    # Try to use a better font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
        small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        try:
            font = ImageFont.truetype("arial.ttf", 24)
            small_font = ImageFont.truetype("arial.ttf", 16)
        except:
            font = ImageFont.load_default()
            small_font = ImageFont.load_default()
    
    # Calculate text position
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Add dimensions
    dim_text = f"{width} × {height}"
    dim_bbox = draw.textbbox((0, 0), dim_text, font=small_font)
    dim_width = dim_bbox[2] - dim_bbox[0]
    dim_x = (width - dim_width) // 2
    dim_y = y + text_height + 10
    
    draw.text((dim_x, dim_y), dim_text, fill=(150, 150, 150), font=small_font)
    
    # Save image
    image.save(filename)
    print(f"Created: {filename}")

def main():
    # Create images directory
    images_dir = "/Users/dimi/workspace/CADAssistant/static/images"
    os.makedirs(images_dir, exist_ok=True)
    
    # Define placeholder images
    images = [
        (800, 400, "CAD-Assistant Teaser\nMultimodal CAD Task Solving", "teaser.png"),
        (800, 500, "System Overview\nVLLM Planner + Environment + Tools", "system_overview.png"),
        (400, 300, "Sketch to 3D\nConversion", "sketch_to_3d.png"),
        (400, 300, "3D Scan\nReconstruction", "3d_scan_reconstruction.png"),
        (400, 300, "Semantic\nOperations", "semantic_operations.png"),
    ]
    
    # Create each placeholder image
    for width, height, text, filename in images:
        filepath = os.path.join(images_dir, filename)
        create_placeholder_image(width, height, text, filepath)
    
    print(f"\nAll placeholder images created in: {images_dir}")

if __name__ == "__main__":
    main()