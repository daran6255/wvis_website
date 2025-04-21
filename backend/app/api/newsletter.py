import os
from flask import Blueprint, jsonify, request, url_for, current_app
from werkzeug.utils import secure_filename
from app.models.newsletter import Newsletter
from app.database import db
import uuid

blp = Blueprint("newsletter", __name__, url_prefix="/api/newsletters")

@blp.route("/getall", methods=["GET"])
def get_all_newsletters():
    newsletters = Newsletter.query.order_by(Newsletter.created_at.desc()).all()
    result = []

    for item in newsletters:
        result.append({
            "title": item.title,
            "image": url_for("static", filename=f"images/{item.image}", _external=True),
            "link": url_for("static", filename=f"pdfs/{item.pdf}", _external=True),
            "description": item.description,
        })

    return jsonify(result), 200



@blp.route("/postnewsletter", methods=["POST"])
def create_newsletter():
    title = request.form.get("title")
    description = request.form.get("description")
    image_file = request.files.get("image")
    pdf_file = request.files.get("pdf")

    # Validate fields
    if not all([title, description, image_file, pdf_file]):
        return jsonify({"error": "Missing required fields"}), 400

    # Secure and save the uploaded files
    image_filename = secure_filename(image_file.filename)
    pdf_filename = secure_filename(pdf_file.filename)

    image_path = os.path.join(current_app.static_folder, "images", image_filename)
    pdf_path = os.path.join(current_app.static_folder, "pdfs", pdf_filename)

    image_file.save(image_path)
    pdf_file.save(pdf_path)

    # Create and store in DB
    newsletter = Newsletter(
        id=uuid.uuid4(),
        title=title,
        description=description,
        image=image_filename,
        pdf=pdf_filename
    )

    db.session.add(newsletter)
    db.session.commit()

    return jsonify({"message": "Newsletter created successfully!"}), 201
