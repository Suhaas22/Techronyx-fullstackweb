# Generated from the current ecommapp models.

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=300)),
                ("image", models.ImageField(upload_to="products/")),
                ("rating", models.FloatField()),
                ("reviews", models.PositiveIntegerField()),
                ("old_price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("new_price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("discount", models.CharField(max_length=10)),
                ("offer", models.CharField(max_length=100)),
                ("bestseller", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="ProductDetail",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image1", models.ImageField(blank=True, null=True, upload_to="products/details/")),
                ("image2", models.ImageField(blank=True, null=True, upload_to="products/details/")),
                ("image3", models.ImageField(blank=True, null=True, upload_to="products/details/")),
                ("image4", models.ImageField(blank=True, null=True, upload_to="products/details/")),
                ("gallery1", models.ImageField(blank=True, null=True, upload_to="products/gallery/")),
                ("gallery2", models.ImageField(blank=True, null=True, upload_to="products/gallery/")),
                ("gallery3", models.ImageField(blank=True, null=True, upload_to="products/gallery/")),
                ("gallery4", models.ImageField(blank=True, null=True, upload_to="products/gallery/")),
                ("stock_status", models.CharField(max_length=100)),
                ("offer", models.TextField(default="No current offer")),
                ("description", models.TextField()),
                ("rating", models.CharField(default="0.0", max_length=10)),
                ("reviews", models.IntegerField(default=0)),
                ("new_price", models.CharField(default="0", max_length=20)),
                ("old_price", models.CharField(default="0", max_length=20)),
                ("discount", models.CharField(default="0%", max_length=10)),
                ("product", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="details", to="ecommapp.product")),
            ],
        ),
        migrations.CreateModel(
            name="CartItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("quantity", models.PositiveIntegerField(default=1)),
                ("product", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="ecommapp.product")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="cartitems", to=settings.AUTH_USER_MODEL)),
            ],
            options={"unique_together": {("user", "product")}},
        ),
    ]
