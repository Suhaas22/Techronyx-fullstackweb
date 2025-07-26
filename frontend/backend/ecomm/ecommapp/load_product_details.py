from ecommapp.models import Product, ProductDetail
from django.core.files import File
import os

product = Product.objects.get(id=1) 

base_path = "media/productdetails"

detail = ProductDetail(
    product=product,
    rating=4.4,
    reviews=321,
    old_price="₹3,999",
    new_price="₹2,499",
    discount="38%",
    offer="Get extra ₹200 off on prepaid orders",
    stock_status="In Stock",
    description="Equipped with Bluetooth 5.4, these headphones...",
)


with open(f"{base_path}/boultmain.png", "rb") as f:
    detail.image1.save("boultmain.png", File(f), save=False)
with open(f"{base_path}/boult1.png", "rb") as f:
    detail.image2.save("boult1.png", File(f), save=False)
with open(f"{base_path}/boult2.png", "rb") as f:
    detail.image3.save("boult2.png", File(f), save=False)
with open(f"{base_path}/boult3.png", "rb") as f:
    detail.image4.save("boult3.png", File(f), save=False)

with open(f"{base_path}/prodgallery1.png", "rb") as f:
    detail.gallery1.save("prodgallery1.png", File(f), save=False)
with open(f"{base_path}/prodgallery2.png", "rb") as f:
    detail.gallery2.save("prodgallery2.png", File(f), save=False)
with open(f"{base_path}/prodgallery3.png", "rb") as f:
    detail.gallery3.save("prodgallery3.png", File(f), save=False)
with open(f"{base_path}/prodgallery4.png", "rb") as f:
    detail.gallery4.save("prodgallery4.png", File(f), save=False)

detail.save()
print(" ProductDetail loaded successfully.")
