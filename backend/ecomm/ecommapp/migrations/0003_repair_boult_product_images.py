from django.db import migrations


def repair_boult_product_images(apps, schema_editor):
    Product = apps.get_model("ecommapp", "Product")
    ProductDetail = apps.get_model("ecommapp", "ProductDetail")

    try:
        product = Product.objects.get(pk=7)
    except Product.DoesNotExist:
        return

    # Paths are relative to MEDIA_ROOT. They must stay below products/ so the
    # generated /media/products/... URL resolves to a deployed file.
    product.image = "products/boultmain.png"
    product.save(update_fields=["image"])

    ProductDetail.objects.update_or_create(
        product=product,
        defaults={
            "image1": "products/details/boultmain.png",
            "image2": "products/details/boult1.png",
            "image3": "products/details/boult2.png",
            "image4": "products/details/boult3.png",
            "gallery1": "products/gallery/prodgallery1.png",
            "gallery2": "products/gallery/prodgallery2.png",
            "gallery3": "products/gallery/prodgallery3.png",
            "gallery4": "products/gallery/prodgallery4.png",
            "rating": "4.4",
            "reviews": 321,
            "new_price": "₹2,499",
            "old_price": "₹3,999",
            "discount": "38%",
            "offer": "Get extra ₹200 off on prepaid orders",
            "stock_status": "In Stock",
            "description": (
                "Boult X Mustang headphones provide Bluetooth 5.4, Type-C fast "
                "charging, four EQ modes, IPX5 water resistance, and AUX support."
            ),
        },
    )


class Migration(migrations.Migration):
    dependencies = [("ecommapp", "0002_seed_products")]

    operations = [migrations.RunPython(repair_boult_product_images, migrations.RunPython.noop)]
