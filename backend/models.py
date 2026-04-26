from datetime import datetime, UTC

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ClassificationCache(db.Model):
    __tablename__ = "classification_cache"

    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(32), nullable=False, index=True)
    product_id = db.Column(db.String(128), nullable=True, index=True)
    normalized_title = db.Column(db.String(512), nullable=False, index=True)
    category = db.Column(db.String(32), nullable=False)
    estimated_weight_lbs = db.Column(db.Float, nullable=False)
    confidence = db.Column(db.Float, nullable=False, default=0.0)
    classification_source = db.Column(db.String(32), nullable=False)
    reason = db.Column(db.Text, nullable=True)
    manual_override = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
    )
