"""create repositories table

Revision ID: 20260320_0001
Revises:
Create Date: 2026-03-20
"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "20260320_0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "repositories",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("repo_url", sa.String(length=300), nullable=False),
        sa.Column("owner", sa.String(length=100), nullable=False),
        sa.Column("repo_name", sa.String(length=200), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_repositories_repo_url", "repositories", ["repo_url"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_repositories_repo_url", table_name="repositories")
    op.drop_table("repositories")
